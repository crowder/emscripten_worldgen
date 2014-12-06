
all:
	emcc -O3 --pre-js /Users/bcrowder/emsdk_portable/emscripten/1.27.0/third_party/websockify/include/base64.js --pre-js worldgen_init.js worldgen-2.2a.c -o worldgen.html --shell-file worldgen_shell.html
