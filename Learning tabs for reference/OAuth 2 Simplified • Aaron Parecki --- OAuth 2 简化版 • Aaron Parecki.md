This post describes OAuth 2.0 in a simplified format to help developers and service providers implement the protocol.  
这篇文章以简化的格式描述了 OAuth 2.0，以帮助开发人员和服务提供商实施该协议。

The [OAuth 2 spec](https://oauth.net/2/) can be a bit confusing to read, so I've written this post to help describe the terminology in a simplified format. The core spec leaves many decisions up to the implementer, often based on security tradeoffs of the implementation. Instead of describing all possible decisions that need to be made to successfully implement OAuth 2, this post makes decisions that are appropriate for most implementations.  
OAuth 2 规范读起来可能有点混乱，所以我写这篇文章是为了帮助以简化的格式描述术语。核心规范将许多决定留给实施者，通常基于实施的安全权衡。这篇文章没有描述成功实施 OAuth 2 需要做出的所有可能的决定，而是做出适合大多数实施的决定。

[![](https://aaronparecki.com/oauth-2-simplified/nuts-and-bolts-of-oauth.png)
](https://www.udemy.com/course/oauth-2-simplified/?referralCode=B04F59AED67B8DA74FA7)

Table of Contents目录
-------------------

*   [Roles](#roles): Applications, APIs and Users  
    角色：应用程序、API 和用户
*   [Creating an App 创建应用程序](#creating-an-app)
*   [Authorization](#authorization): Obtaining an access token  
    授权：获取访问令牌
    *   [Web Server Apps 网络服务器应用](#web-server-apps)
    *   [Single-Page Apps 单页应用](#single-page-apps)
    *   [Mobile Apps 移动应用](#mobile-apps)
    *   [Other Grant Types 其他资助类型](#others)
*   [Making Authenticated Requests 发出经过身份验证的请求](#making-authenticated-requests)
*   [Differences from OAuth 1.0  
    与 OAuth 1.0 的区别](#differences)
    *   [Authentication and Signatures 身份验证和签名](#authentication-and-signatures)
    *   [User Experience and Alternative Authorization Flows  
        用户体验和替代授权流程](#user-experience-and-alternative-authorization-flows)
    *   [Performance at Scale 大规模性能](#performance-at-scale)
*   [Resources 资源](#resources)

Roles
-----

### The Third-Party Application: "Client"  
第三方应用程序：“客户端”

The client is the application that is attempting to get access to the user's account. It needs to get permission from the user before it can do so.  
客户端是试图访问用户帐户的应用程序。它需要先获得用户的许可才能这样做。

### The API: "Resource Server"API：“资源服务器”

The resource server is the API server used to access the user's information.  
资源服务器是用来访问用户信息的API服务器。

### The Authorization Server授权服务器

This is the server that presents the interface where the user approves or denies the request. In smaller implementations, this may be the same server as the API server, but larger scale deployments will often build this as a separate component.  
这是呈现用户批准或拒绝请求的界面的服务器。在较小的实现中，这可能是与 API 服务器相同的服务器，但较大规模的部署通常会将其构建为一个单独的组件。

### The User: "Resource Owner"用户：“资源所有者”

The resource owner is the person who is giving access to some portion of their account.  
资源所有者是授予访问其帐户某些部分的权限的人。

Creating an App创建应用程序
---------------------

Before you can begin the OAuth process, you must first register a new app with the service. When registering a new app, you usually register basic information such as application name, website, a logo, etc. In addition, you must register a redirect URI to be used for redirecting users to for web server, browser-based, or mobile apps.  
在开始 OAuth 流程之前，您必须先向该服务注册一个新应用程序。注册新应用时，通常会注册应用名称、网站、徽标等基本信息。此外，您还必须注册重定向 URI，用于将用户重定向到 Web 服务器、基于浏览器的应用或移动应用.

### Redirect URIs重定向 URI

The service will only redirect users to a registered URI, which helps prevent some attacks. Any HTTP redirect URIs must be served via HTTPS. This helps prevent tokens from being intercepted during the authorization process. Native apps may register a redirect URI with a custom URL scheme for the application, which may look like `demoapp://redirect`.  
该服务只会将用户重定向到已注册的 URI，这有助于防止某些攻击。必须通过 HTTPS 提供任何 HTTP 重定向 URI。这有助于防止令牌在授权过程中被拦截。本机应用程序可以使用应用程序的自定义 URL 方案注册重定向 URI，它可能看起来像 `demoapp://redirect` 。

### Client ID and Secret客户端 ID 和密码

After registering your app, you will receive a client ID and optionally a client secret. The client ID is considered public information, and is used to build login URLs, or included in Javascript source code on a page. The client secret **must** be kept confidential. If a deployed app cannot keep the secret confidential, such as single-page Javascript apps or native apps, then the secret is not used, and ideally the service shouldn't issue a secret to these types of apps in the first place.  
注册您的应用程序后，您将收到一个客户端 ID 和可选的客户端密码。客户端 ID 被视为公共信息，用于构建登录 URL，或包含在页面上的 Javascript 源代码中。客户端机密必须保密。如果已部署的应用程序无法将秘密保密，例如单页 Javascript 应用程序或本机应用程序，则不会使用该秘密，理想情况下，该服务不应首先向这些类型的应用程序发布秘密。

The first step of OAuth 2 is to get authorization from the user. For browser-based or mobile apps, this is usually accomplished by displaying an interface provided by the service to the user.  
OAuth 2 的第一步是获得用户的授权。对于基于浏览器或移动应用程序，这通常是通过向用户显示服务提供的界面来实现的。

OAuth 2 provides several "grant types" for different use cases. The grant types defined are:  
OAuth 2 为不同的用例提供了几种“授权类型”。定义的授权类型是：

*   **Authorization Code** for apps running on a [web server](#web-server-apps), [browser-based](#browser-based-apps) and [mobile apps](#mobile-apps)  
    在 Web 服务器上运行的应用程序、基于浏览器的应用程序和移动应用程序的授权码
*   **Password** for logging in with a [username and password](#other-app-types) (only for first-party apps)  
    使用用户名和密码登录的密码（仅适用于第一方应用程序）
*   **Client credentials** for [application access](#client-credentials) without a user present  
    在没有用户在场的情况下访问应用程序的客户端凭据
*   **Implicit** was previously recommended for clients without a secret, but has been superseded by using the Authorization Code grant with PKCE.  
    Implicit 以前被推荐给没有秘密的客户端，但已被 PKCE 使用授权代码授予所取代。

Each use case is described in detail below.  
下面详细描述了每个用例。

Web Server Apps网络服务器应用
----------------------

Web server apps are the most common type of application you encounter when dealing with OAuth servers. Web apps are written in a server-side language and run on a server where the source code of the application is not available to the public. This means the application is able to use its client secret when communicating with the authorization server, which can help avoid many attack vectors.  
Web 服务器应用程序是您在处理 OAuth 服务器时遇到的最常见的应用程序类型。 Web 应用程序是用服务器端语言编写的，并在应用程序的源代码不向公众开放的服务器上运行。这意味着应用程序在与授权服务器通信时能够使用其客户端密钥，这有助于避免许多攻击向量。

### Authorization授权

Create a "Log In" link sending the user to:  
创建一个“登录”链接，将用户发送到：

```
https://authorization-server.com/auth?response_type=code&
  client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=photos&state=1234zyx
```

*   **response_type=code** \- Indicates that your server expects to receive an authorization code  
    response_type=code - 表示您的服务器希望收到授权码
*   **client_id** \- The client ID you received when you first created the application  
    client_id - 首次创建应用程序时收到的客户端 ID
*   **redirect_uri** \- Indicates the URI to return the user to after authorization is complete  
    redirect_uri - 表示授权完成后用户返回的URI
*   **scope** \- One or more scope values indicating which parts of the user's account you wish to access  
    范围 \- 一个或多个范围值，指示您希望访问用户帐户的哪些部分
*   **state** \- A random string generated by your application, which you'll verify later  
    state - 由您的应用程序生成的随机字符串，稍后您将对其进行验证

The user sees the authorization prompt  
用户看到授权提示

![](https://aaronparecki.com/oauth-2-simplified/oauth-authorization-prompt.png)

If the user clicks "Allow," the service redirects the user back to your site with an authorization code  
如果用户单击“允许”，该服务会使用授权代码将用户重定向回您的站点

```
https://example-app.com/cb?code=AUTH_CODE_HERE&state=1234zyx
```

*   **code** \- The server returns the authorization code in the query string  
    代码 \- 服务器在查询字符串中返回授权代码
*   **state** \- The server returns the same state value that you passed  
    state - 服务器返回您传递的相同状态值

You should first compare this state value to ensure it matches the one you started with. You can typically store the state value in a cookie or session, and compare it when the user comes back. This helps ensure your redirection endpoint isn't able to be tricked into attempting to exchange arbitrary authorization codes.  
您应该首先比较此状态值以确保它与您开始使用的值相匹配。您通常可以将状态值存储在 cookie 或会话中，并在用户返回时进行比较。这有助于确保您的重定向端点不会被欺骗以尝试交换任意授权代码。

### Getting an Access Token获取访问令牌

Your server exchanges the authorization code for an access token by making a POST request to the authorization server's token endpoint:  
您的服务器通过向授权服务器的令牌端点发出 POST 请求来交换访问令牌的授权代码：

```
POST https://api.authorization-server.com/token
  grant_type=authorization_code&
  code=AUTH_CODE_HERE&
  redirect_uri=REDIRECT_URI&
  client_id=CLIENT_ID&
  client_secret=CLIENT_SECRET
```

*   **grant\_type=authorization\_code** \- The grant type for this flow is authorization_code  
    grant\_type=authorization\_code - 此流的授权类型是 authorization_code
*   **code=AUTH\_CODE\_HERE** \- This is the code you received in the query string  
    code=AUTH\_CODE\_HERE - 这是您在查询字符串中收到的代码
*   **redirect\_uri=REDIRECT\_URI** \- Must be identical to the redirect URI provided in the original link  
    redirect\_uri=REDIRECT\_URI - 必须与原始链接中提供的重定向 URI 相同
*   **client\_id=CLIENT\_ID** \- The client ID you received when you first created the application  
    client\_id=CLIENT\_ID - 首次创建应用程序时收到的客户端 ID
*   **client\_secret=CLIENT\_SECRET** \- Since this request is made from server-side code, the secret is included  
    client\_secret=CLIENT\_SECRET - 由于此请求是从服务器端代码发出的，因此包含机密

The server replies with an access token and expiration time  
服务器回复访问令牌和过期时间

```
{
  "access_token":"RsT5OjbzRn430zqMLgV3Ia",
  "expires_in":3600
}
```

or if there was an error  
或者如果有错误

```
{
  "error":"invalid_request"
}
```

Security: Note that the service must require apps to pre-register their redirect URIs.  
安全性：请注意，该服务必须要求应用程序预先注册其重定向 URI。

Single-Page Apps单页应用
--------------------

Single-page apps (or browser-based apps) run entirely in the browser after loading the source code from a web page. Since the entire source code is available to the browser, they cannot maintain the confidentiality of a client secret, so the secret is not used in this case. The flow is based on the authorization code flow above, but with the addition of a dynamically generated secret used on each request. This is known as the [PKCE](https://oauth.net/2/pkce) extension.  
从网页加载源代码后，单页应用程序（或基于浏览器的应用程序）完全在浏览器中运行。由于浏览器可以使用整个源代码，因此他们无法维护客户端机密的机密性，因此在这种情况下不使用该机密。该流程基于上面的授权代码流程，但添加了用于每个请求的动态生成的秘密。这称为 PKCE 扩展。

### Authorization授权

Create a random string between 43-128 characters long, then generate the url-safe base64-encoded SHA256 hash of the string. The original random string is known as the `code_verifier`, and the hashed version is known as the `code_challenge`.  
创建一个长度在 43-128 个字符之间的随机字符串，然后生成字符串的 url 安全 base64 编码 SHA256 哈希。原始随机字符串称为 `code_verifier` ，散列版本称为 `code_challenge` 。

Create a random string (code verifier), e.g. `5d2309e5bb73b864f989753887fe52f79ce5270395e25862da6940d5`  
创建一个随机字符串（代码验证器），例如 `5d2309e5bb73b864f989753887fe52f79ce5270395e25862da6940d5`

Create the SHA256 hash, then base64-encode the string (code challenge): `MChCW5vD-3h03HMGFZYskOSTir7II_MMTb8a9rJNhnI`  
创建 SHA256 哈希，然后对字符串进行 base64 编码（代码挑战）： `MChCW5vD-3h03HMGFZYskOSTir7II_MMTb8a9rJNhnI`

(You can use the helper utility at [example-app.com/pkce](https://example-app.com/pkce) to generate a secret and hash.)  
（您可以使用 example-app.com/pkce 上的辅助实用程序来生成秘密和哈希。）

Create a "Log In" link like the authorization code flow above, but now include the code challenge in the request:  
像上面的授权代码流程一样创建一个“登录”链接，但现在在请求中包含代码质询：

```
https://authorization-server.com/auth?response_type=code&
  client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=photos&state=1234zyx&code_challenge=CODE_CHALLENGE&code_challenge_method=S256
```

*   **response_type=code** \- Indicates that your server expects to receive an authorization code  
    response_type=code - 表示您的服务器希望收到授权码
*   **client_id** \- The client ID you received when you first created the application  
    client_id - 首次创建应用程序时收到的客户端 ID
*   **redirect_uri** \- Indicates the URI to return the user to after authorization is complete  
    redirect_uri - 表示授权完成后用户返回的URI
*   **scope** \- One or more scope values indicating which parts of the user's account you wish to access  
    范围 \- 一个或多个范围值，指示您希望访问用户帐户的哪些部分
*   **state** \- A random string generated by your application, which you'll verify later  
    state - 由您的应用程序生成的随机字符串，稍后您将对其进行验证
*   **code_challenge** \- The URL-safe base64-encoded SHA256 hash of the secret  
    code_challenge - 秘密的 URL 安全 base64 编码的 SHA256 散列
*   **code\_challenge\_method=S256** \- Indicate which hashing method you used (S256)  
    code\_challenge\_method=S256 - 表明您使用了哪种哈希方法 (S256)

The user sees the authorization prompt  
用户看到授权提示

![](https://aaronparecki.com/oauth-2-simplified/oauth-authorization-prompt.png)

If the user clicks "Allow," the service redirects the user back to your site with an auth code  
如果用户点击“允许”，该服务会使用授权码将用户重定向回您的站点

```
https://example-app.com/cb?code=AUTH_CODE_HERE&state=1234zyx
```

*   **code** \- The server returns the authorization code in the query string  
    代码 \- 服务器在查询字符串中返回授权代码
*   **state** \- The server returns the same state value that you passed  
    state - 服务器返回您传递的相同状态值

You should first compare this state value to ensure it matches the one you started with. You can typically store the state value in a cookie, and compare it when the user comes back. This ensures your redirection endpoint isn't able to be tricked into attempting to exchange arbitrary authorization codes.  
您应该首先比较此状态值以确保它与您开始使用的值相匹配。您通常可以将状态值存储在 cookie 中，并在用户返回时进行比较。这可确保您的重定向端点不会被欺骗以尝试交换任意授权代码。

You can find a complete example of using PKCE in JavaScript in my blog post [Is the OAuth Implicit Flow Dead?](https://developer.okta.com/blog/2019/05/01/is-the-oauth-implicit-flow-dead)  
您可以在我的博文 Is the OAuth Implicit Flow Dead? 中找到在 JavaScript 中使用 PKCE 的完整示例。

### Getting an Access Token获取访问令牌

Now you'll need to exchange the authorization code for an access token, but instead of providing a pre-registered client secret, you send the PKCE secret you generated at the beginning of the flow.  
现在您需要将授权代码交换为访问令牌，但您无需提供预注册的客户端密码，而是发送您在流程开始时生成的 PKCE 密码。

```
POST https://api.authorization-server.com/token
  grant_type=authorization_code&
  code=AUTH_CODE_HERE&
  redirect_uri=REDIRECT_URI&
  client_id=CLIENT_ID&
  code_verifier=CODE_VERIFIER
```

*   **grant\_type=authorization\_code** \- The grant type for this flow is authorization_code  
    grant\_type=authorization\_code - 此流的授权类型是 authorization_code
*   **code=AUTH\_CODE\_HERE** \- This is the code you received in the query string  
    code=AUTH\_CODE\_HERE - 这是您在查询字符串中收到的代码
*   **redirect\_uri=REDIRECT\_URI** \- Must be identical to the redirect URI provided in the original link  
    redirect\_uri=REDIRECT\_URI - 必须与原始链接中提供的重定向 URI 相同
*   **client\_id=CLIENT\_ID** \- The client ID you received when you first created the application  
    client\_id=CLIENT\_ID - 首次创建应用程序时收到的客户端 ID
*   **code\_verifier=CODE\_VERIFIER** \- The random secret you generated at the beginning  
    code\_verifier=CODE\_VERIFIER - 你一开始生成的随机密码

The authorization server will hash the verifier and compare it to the challenge sent in the request, and only issue the access token if they match. This ensures that even if someone was able to intercept the authorization code, they will not be able to use it to get an access token since they won't have the secret.  
授权服务器会对验证者进行哈希处理，并将其与请求中发送的质询进行比较，只有在它们匹配时才会颁发访问令牌。这确保即使有人能够拦截授权代码，他们也无法使用它来获取访问令牌，因为他们没有秘密。

Mobile Apps移动应用
---------------

Like browser-based apps, mobile apps also cannot maintain the confidentiality of a client secret. Because of this, mobile apps also use the PKCE flow which does not require a client secret. There are some additional concerns that mobile apps should keep in mind to ensure the security of the OAuth flow.  
与基于浏览器的应用程序一样，移动应用程序也无法维护客户机密的机密性。因此，移动应用程序还使用不需要客户端密码的 PKCE 流程。为确保 OAuth 流程的安全性，移动应用程序还应牢记一些其他问题。

### Authorization授权

Create a "Log in" button sending the user to either the native app of the service on the phone, or a mobile web page for the service. Apps can register a custom URI scheme such as "example-app://" so the native app is launched whenever a URL with that protocol is visited, or they can register URL patterns which will launch the native app if a URL matching the pattern is visited.  
创建一个“登录”按钮，将用户发送到手机上服务的本机应用程序或服务的移动网页。应用程序可以注册自定义 URI 方案，例如“example-app://”，以便在访问具有该协议的 URL 时启动本机应用程序，或者它们可以注册 URL 模式，如果 URL 与该模式匹配，则会启动本机应用程序被访问。

#### Using the Service's Native App使用服务的本机应用程序

If the user has the native Facebook app installed, direct them to the following URL:  
如果用户安装了本机 Facebook 应用程序，请将他们定向到以下 URL：

```
fbauth2://authorize?response_type=code&client_id=CLIENT_ID
  &redirect_uri=REDIRECT_URI&scope=email&state=1234zyx
```

*   **response_type=code** \- indicates that your server expects to receive an authorization code  
    response_type=code - 表示您的服务器希望收到授权码
*   **client\_id=CLIENT\_ID** \- The client ID you received when you first created the application
*   **redirect\_uri=REDIRECT\_URI** \- Indicates the URI to return the user to after authorization is complete, such as `fb00000000://authorize`
*   **scope=email** \- One or more scope values indicating which parts of the user's account you wish to access
*   **state=1234zyx** \- A random string generated by your application, which you'll verify later

For servers that support the [PKCE extension](https://oauth.net/2/pkce/) (and if you're building a server, you should support the PKCE extension), you'll also include the following parameters. First, create a "code verifier" which is a random string that the app stores locally.

*   **code_challenge=XXXXXXX** \- This is a base64-encoded version of the sha256 hash of the code verifier string
*   **code\_challenge\_method=S256** \- Indicates the hashing method used to compute the challenge, in this case, sha256.

Note that your redirect URI will probably look like `fb00000000://authorize` where the protocol is a custom URL scheme that your app has registered with the OS.

#### Using a Web Browser

If the service does not have a native application, you can launch a mobile browser to the standard web authorization URL. Note that you should never use an embedded web view in your own application, as this provides the user no guarantee that they are actually are entering their password in the service's website rather than a phishing site.

You should either launch the native mobile browser, or use the new iOS "SafariViewController" to launch an embedded browser in your application. This API was added in iOS 9, and provides a mechanism to launch a browser inside the application that both shows the address bar so the user can confirm they're on the correct website, and also shares cookies with the real Safari browser. It also prevents the application from inspecting and modifying the contents of the browser, so can be considered secure.

```
https://facebook.com/dialog/oauth?response_type=code&client_id=CLIENT_ID
  &redirect_uri=REDIRECT_URI&scope=email&state=1234zyx
```

Again, if the service supports PKCE, then those parameters should be included as well as described above.

*   **response_type=code** \- indicates that your server expects to receive an authorization code
*   **client\_id=CLIENT\_ID** \- The client ID you received when you first created the application
*   **redirect\_uri=REDIRECT\_URI** \- Indicates the URI to return the user to after authorization is complete, such as `fb00000000://authorize`
*   **scope=email** \- One or more scope values indicating which parts of the user's account you wish to access
*   **state=1234zyx** \- A random string generated by your application, which you'll verify later

The user will see the authorization prompt

![](https://aaronparecki.com/oauth-2-simplified/everyday-city-auth.png)

### Getting an Access Token

After clicking "Approve", the user will be redirected back to your application with a URL like

```
fb00000000://authorize?code=AUTHORIZATION_CODE&state=1234zyx
```

Your mobile application should first verify that the state corresponds to the state that was used in the initial request, and can then exchange the authorization code for an access token.

The token exchange will look the same as exchanging the code in the web server app case, except that the secret is not sent. If the server supports PKCE, then you will need to include an additional parameter as described below.

```
POST https://api.authorization-server.com/token
  grant_type=authorization_code&
  code=AUTH_CODE_HERE&
  redirect_uri=REDIRECT_URI&
  client_id=CLIENT_ID&
  code_verifier=VERIFIER_STRING
```

*   **grant\_type=authorization\_code** \- The grant type for this flow is authorization_code
*   **code=AUTH\_CODE\_HERE** \- This is the code you received in the query string
*   **redirect\_uri=REDIRECT\_URI** \- Must be identical to the redirect URI provided in the original link
*   **client\_id=CLIENT\_ID** \- The client ID you received when you first created the application
*   **code\_verifier=VERIFIER\_STRING** \- The plaintext string that you previously hashed to create the code_challenge

The authorization server will verify this request and return an access token.

If the server supports PKCE, then the authorization server will recognize that this code was generated with a code challenge, and will hash the provided plaintext and confirm that the hashed version corresponds with the hashed string that was sent in the initial authorization request. This ensures the security of using the authorization code flow with clients that don't support a secret.

Other Grant Types
-----------------

### Password

OAuth 2 also provides a "password" grant type which can be used to exchange a username and password for an access token directly. Since this obviously requires the application to collect the user's password, it must only be used by apps created by the service itself. For example, the native Twitter app could use this grant type to log in on mobile or desktop apps.

To use the password grant type, simply make a POST request like the following:

```
POST https://api.authorization-server.com/token
  grant_type=password&
  username=USERNAME&
  password=PASSWORD&
  client_id=CLIENT_ID
```

*   **grant_type=password** \- The grant type for this flow is password
*   **username=USERNAME** \- The user's username as collected by the application
*   **password=PASSWORD** \- The user's password as collected by the application
*   **client\_id=CLIENT\_ID** \- The client ID you received when you first created the application

The server replies with an access token in the same format as the other grant types.

Note, the client secret is not included here under the assumption that most of the use cases for password grants will be mobile or desktop apps, where the secret cannot be protected.

### Application access

In some cases, applications may need an access token to act on behalf of themselves rather than a user. For example, the service may provide a way for the application to update their own information such as their website URL or icon, or they may wish to get statistics about the users of the app. In this case, applications need a way to get an access token for their own account, outside the context of any specific user. OAuth provides the `client_credentials` grant type for this purpose.

To use the client credentials grant type, make a POST request like the following:

```
POST https://api.authorization-server.com/token
    grant_type=client_credentials&
    client_id=CLIENT_ID&
    client_secret=CLIENT_SECRET
```

The response will include an access token in the same format as the other grant types.

Making Authenticated Requests
-----------------------------

The end result of all the grant types is obtaining an access token.

Now that you have an access token, you can make requests to the API. You can quickly make an API request using cURL as follows:

```
curl -H "Authorization: Bearer RsT5OjbzRn430zqMLgV3Ia" \
https://api.authorization-server.com/1/me

```

That's it! Make sure you always send requests over HTTPS and never ignore invalid certificates. HTTPS is the only thing protecting requests from being intercepted or modified.

Differences from OAuth 1.0
--------------------------

OAuth 1.0 was largely based on existing proprietary protocols such as Flickr's "FlickrAuth" and Google's "AuthSub". The result represented the best solution based on actual implementation experience. However, after several years of working with the protocol, the community learned enough to rethink and improve the protocol in three main areas where OAuth 1.0 proved limited or confusing.

You can read more about this in detail in my book [OAuth 2.0 Simplified](https://www.oauth.com/oauth2-servers/differences-between-oauth-1-2/).

Resources
---------

*   OAuth 2.0 Simplified - the book [oauth2simplified.com](https://oauth2simplified.com/)
*   Learn more about [creating OAuth 2.0 Servers](https://www.oauth.com/)
*   [PKCE Extension](https://tools.ietf.org/html/rfc7636)
*   [Recommendations for Native Apps](https://tools.ietf.org/html/draft-ietf-oauth-native-apps-07)
*   More information is available on [OAuth.net](https://oauth.net/)
*   Some content adapted from [hueniverse.com](http://hueniverse.com/).

Previous versions of this post:

*   [July 2012](https://aaronparecki.com/2012/07/29/7/oauth2-simplified)