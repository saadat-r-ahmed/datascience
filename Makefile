build:
	jupyter-book build .
	cp _static/*.js _build/html/_static/
	cp _static/*.css _build/html/_static/ 2>/dev/null || true

serve:
	cd _build/html && python3 -m http.server 8765

clean:
	jupyter-book clean .

.PHONY: build serve clean
