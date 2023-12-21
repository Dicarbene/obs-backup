
## 第零章

配环境, 使用wsl2, Ubuntu2204进行配置
vscode远程资源管理进行服务器操作
## 第一章

三叶虫系统最小运行结果

![[Pasted image 20231217152748.png]]
### 移除标准库依赖[link](https://rcore-os.cn/rCore-Tutorial-Book-v3/chapter1/2remove-std.html#term-remove-std "永久链接至标题")

#### 分析二进制可执行程序

分析去除了标准库和main函数的可执行程序:

```rust
// os/src/main.rs
#![no_main]
#![no_std]
mod lang_items;
// ... other code


// os/src/lang_items.rs
use core::panic::PanicInfo;

#[panic_handler]
fn panic(_info: &PanicInfo) -> ! {
    loop {}
}
```

编译方式:

```sh
cargo build
```

分析这个二进制可执行程序，首先需要安装 cargo-binutils 工具集：

```sh
cargo install cargo-binutils
rustup component add llvm-tools-preview
```

分析方式
```
文件格式
$ file target/riscv64gc-unknown-none-elf/debug/os
target/riscv64gc-unknown-none-elf/debug/os: ELF 64-bit LSB executable, UCB RISC-V, ......

# 文件头信息
$ rust-readobj -h target/riscv64gc-unknown-none-elf/debug/os
   File: target/riscv64gc-unknown-none-elf/debug/os
   Format: elf64-littleriscv
   Arch: riscv64
   AddressSize: 64bit
   ......
   Type: Executable (0x2)
   Machine: EM_RISCV (0xF3)
   Version: 1
   Entry: 0x0
   ......
   }

# 反汇编导出汇编程序
$ rust-objdump -S target/riscv64gc-unknown-none-elf/debug/os
   target/riscv64gc-unknown-none-elf/debug/os:       file format elf64-littleriscv
```

通过 `file` 工具对二进制程序 `os` 的分析可以看到它好像是一个合法的 RISC-V 64 可执行程序，但通过 `rust-readobj` 工具进一步分析，发现它的入口地址 Entry 是 `0` ，从 C/C++ 等语言中得来的经验告诉我们， `0` 一般表示 NULL 或空指针，因此等于 `0` 的入口地址看上去无法对应到任何指令。再通过 `rust-objdump` 工具把它反汇编，可以看到没有生成汇编代码。所以，我们可以断定，这个二进制程序虽然合法，但它是一个空程序。产生该现象的原因是：目前我们的程序（参考上面的源代码）没有进行任何有意义的工作，由于我们移除了 `main` 函数并将项目设置为 `#![no_main]` ，它甚至没有一个传统意义上的入口点（即程序首条被执行的指令所在的位置），因此 Rust 编译器会生成一个空程序。

**思考： 0x80200000 可否改为其他地址？**

首先需要区分绝对地址和相对地址。在对编译器进行某些设置的情况下，在访问变量或函数时，可以通过它们所在地址与当前某个寄存器（如 PC）的相对地址而非它们位于的绝对地址来访问这些变量或函数。比如，在一个起始地址（即上面提到的 `BASE_ADDRESS` ）固定为 `0x80200000` 的内存布局中，某个函数入口位于 `0x80201111` 处，那么我们可以使用其绝对地址 `0x80201111` 来访问它。但是，如果一条位于 `0x80200111` 指令会调用该函数，那么这条指令也不一定要用到绝对地址 `0x80201111` ，而是用函数入口地址相对于当前指令地址 `0x80200111` 的相对地址 `0x1000` （计算方式为函数入口地址与当前指令地址之差值）来找到并调用该函数。

如果一个程序全程都使用相对地址而不依赖任何绝对地址，那么只要保持好各段之间的相对位置不发生变化，将程序整体加载到内存中的任意位置程序均可正常运行。在这种情况下， `BASE_ADDRESS` 可以为任意值，我们可以将程序在内存中随意平移。这种程序被称为 **位置无关可执行文件（PIE，Position-independent Executable）** 。相对的，如果程序依赖绝对地址，那么它一定有一个确定的内存布局，而且该程序必须被加载到与其内存布局一致的位置才能正常运行。

**静态链接与动态链接**

静态链接是指程序在编译时就将所有用到的函数库的目标文件链接到可执行文件中，这样会导致可执行文件容量较大，占用硬盘空间；而动态链接是指程序在编译时仅在可执行文件中记录用到哪些函数库和在这些函数库中用到了哪些符号，在操作系统执行该程序准备将可执行文件加载到内存时，操作系统会检查这些被记录的信息，将用到的函数库的代码和数据和程序一并加载到内存，并进行一些重定位工作，即对装入内存的目标程序中的指令或数据的内存地址进行修改，确保程序运行时能正确找到相关函数或数据。使用动态链接可以显著缩减可执行文件的容量，并使得程序不必在函数库更新后重新链接依然可用。

### 手动加载内核可执行文件[link](https://rcore-os.cn/rCore-Tutorial-Book-v3/chapter1/4first-instruction-in-kernel2.html#id5 "永久链接至标题")

上面得到的内核可执行文件完全符合我们对于内存布局的要求，但是我们不能将其直接提交给 Qemu ，因为它除了实际会被用到的代码和数据段之外还有一些多余的元数据，这些元数据无法被 Qemu 在加载文件时利用，且会使代码和数据段被加载到错误的位置。如下图所示：![[Pasted image 20231218203213.png]]
使用如下命令可以丢弃内核可执行文件中的元数据得到内核镜像：

```sh
rust-objcopy --strip-all target/riscv64gc-unknown-none-elf/release/os -O binary target/riscv64gc-unknown-none-elf/release/os.bin
```

我们可以使用 `stat` 工具来比较内核可执行文件和内核镜像的大小：

```sh
stat target/riscv64gc-unknown-none-elf/release/os
File: target/riscv64gc-unknown-none-elf/release/os
Size: 1016              Blocks: 8          IO Block: 4096   regular file
...
$ stat target/riscv64gc-unknown-none-elf/release/os.bin
File: target/riscv64gc-unknown-none-elf/release/os.bin
Size: 4                 Blocks: 8          IO Block: 4096   regular file
...
```
在 `os` 目录下通过以下命令启动 Qemu 并加载 RustSBI 和内核镜像：

```sh
 qemu-system-riscv64 \
   -machine virt \
   -nographic \
   -bios ../bootloader/rustsbi-qemu.bin \
   -device loader,file=target/riscv64gc-unknown-none-elf/release/os.bin,addr=0x80200000 \
   -s -S
```
`-s` 可以使 Qemu 监听本地 TCP 端口 1234 等待 GDB 客户端连接，而 `-S` 可以使 Qemu 在收到 GDB 的请求后再开始运行。因此，Qemu 暂时没有任何输出。注意，如果不想通过 GDB 对于 Qemu 进行调试而是直接运行 Qemu 的话，则要删掉最后一行的 `-s -S` 。

Note: 需要到 [仓库](https://github.com/rcore-os/rCore-Tutorial-v3/tree/ch1) 里拷贝 bootloader 目录到跟 `os` 同级目录下
运行结果:
此命令打开1234接口, 还可以在vscode中看到监听hh
![[Pasted image 20231218235551.png]]
打开另一个终端，启动一个 GDB 客户端连接到 Qemu ：

```sh
riscv64-unknown-elf-gdb \
    -ex 'file target/riscv64gc-unknown-none-elf/release/os' \
    -ex 'set arch riscv:rv64' \
    -ex 'target remote localhost:1234'
[GDB output]
0x0000000000001000 in ?? ()
```

Note: 
终端中输入 ` vi .bashrc ` 添加一行 
``` bash
export PATH=$PATH:/home/dicarbene/riscv64-unknown-elf-gcc-8.3.0-2020.04.1-x86_64-linux-ubuntu14/bin
```

运行结果:
![[Pasted image 20231218235531.png]]

Qemu 启动后 PC 被初始化为 `0x1000`。使用gdb检查一下 Qemu 的启动固件的内容：

```sh
(gdb) x/10i $pc
```

运行结果:
![[Pasted image 20231218235922.png]]
这里 `x/10i $pc` 的含义是从当前 PC 值的位置开始，在内存中反汇编 10 条指令。不过可以看到 Qemu 的固件仅包含 5 条指令，从 `0x1014` 开始都是数据，当数据为 0 的时候则会被反汇编为 `unimp` 指令。 `0x101a` 处的数据 `0x8000` 是能够跳转到 `0x80000000` 进入启动下一阶段的关键。有兴趣的读者可以自行探究位于 `0x1000` 和 `0x100c` 两条指令的含义。总之，在执行位于 `0x1010` 的指令之前，寄存器 `t0` 的值恰好为 `0x80000000` ，随后通过 `jr t0` 便可以跳转到该地址。

运行结果:
![[Pasted image 20231219212452.png]]
我们可以用同样的方式反汇编 RustSBI 最初的几条指令并单步调试。不过由于 RustSBI 超出了本书的范围，我们这里并不打算进行深入。接下来我们检查控制权能否被移交给我们的内核：
我们在内核的入口点，也即地址 `0x80200000` 处打一个断点。需要注意，当需要在一个特定的地址打断点时，需要在地址前面加上 `*` 。接下来通过 `c` 命令（Continue 的缩写）让 Qemu 向下运行直到遇到一个断点。可以看到，我们成功停在了 `0x80200000` 处。随后，可以检查内核第一条指令是否被正确执行：

![[Pasted image 20231219212551.png]]
可以看到我们在 `entry.asm` 中编写的第一条指令可以在 `0x80200000` 处找到。这里 `ra` 是寄存器 `x1` 的别名， `p/d $x1` 可以以十进制打印寄存器 `x1` 的值，它的结果正确。最后，作为下一节的铺垫，我们可以检查此时栈指针 `sp` 的值，可以发现它目前是 0 。下一节我们将设置好栈空间，使得内核代码可以正常进行函数调用，随后将控制权转交给 Rust 代码。