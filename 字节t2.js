/*  第三题：求一个字符串的最长无重复字符子字符串长度

题目描述
例子​
源字符串：abcabcabc​
子字符串：abca, abc, ab, a​
无重复字符的子字符串：abc, ab, a​
无重复字符的最长子字符串：abc​
返回结果：3   */

function longestString(src){
  let check = new Map();
  let ans = 0;
  for(let i = 0,j = 0;i<src.length;i++){
    while(check.has(src[i])){
      check.delete(src[j++]);
    }
    check.set(src[i],true);
    ans = Math.max(ans,check.keys().length);
  }
  return ans;
}