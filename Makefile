# Default target
.PHONY: all
all: install run

# Create virtual environment and install dependencies
.PHONY: install
install:
	python -m venv venv
	venv\Scripts\pip.exe install --upgrade pip
	venv\Scripts\pip.exe install fastapi uvicorn

# Run the FastAPI app
.PHONY: run
run:
	venv\Scripts\uvicorn.exe backend.app:app --reload

# Clean up virtual environment
.PHONY: clean
clean:
	if exist venv rmdir /s /q venv
# Remove all generated files
.PHONY: clean-all
clean-all: clean
	if exist __pycache__ rmdir /s /q __pycache__
	del /f /q *.pyc 2>nul
	del /f /q *.pyo 2>nul
# Remove all log files
.PHONY: clean-logs
clean-logs:
	del /f /q *.log 2>nul
# Remove all temporary files
.PHONY: clean-temp
clean-temp:
	del /f /q *.tmp 2>nul
	del /f /q *.temp 2>nul
# Remove all build artifacts

.PHONY: venv
venv:
	@echo "To activate the virtual environment, run:"
	@echo "venv\\Scripts\\activate"
# Activate the virtual environment

.PHONY: deactivate
deactivate:
	@echo "To deactivate the virtual environment, run:"
	@echo "deactivate"
# Deactivate the virtual environment
.PHONY: activate
activate:
	@echo "To activate the virtual environment, run:"
	@echo "venv\\Scripts\\activate"
# Display help message
.PHONY: help
help:
	@echo "Makefile commands:"
	@echo "  all       - Install dependencies and run the app"
	@echo "  install   - Create virtual environment and install dependencies"
	@echo "  run       - Run the FastAPI app"
	@echo "  clean     - Remove the virtual environment"
	@echo "  clean-all - Remove the virtual environment and all generated files"
	@echo "  clean-logs - Remove all log files"
	@echo "  clean-temp - Remove all temporary files"
	@echo "  venv      - Activate the virtual environment"
	@echo "  activate  - Display activation instructions"
	@echo "  help      - Display this help message"
# Display the current Python version
.PHONY: version
version:
	@python --version
	@echo "Python version: $(shell python -c 'import sys; print(sys.version)')"
# Display the current pip version
.PHONY: pip-version
pip-version:
	@venv\Scripts\pip.exe --version
	@echo "Pip version: $(shell venv\Scripts\pip.exe -V)"
# Display the current FastAPI version
.PHONY: fastapi-version
fastapi-version:
	@venv\Scripts\pip.exe show fastapi | findstr Version
	@echo "FastAPI version: $(shell venv\Scripts\pip.exe show fastapi | findstr Version)"
# Display the current Uvicorn version
.PHONY: uvicorn-version
uvicorn-version:
	@venv\Scripts\pip.exe show uvicorn | findstr Version
	@echo "Uvicorn version: $(shell venv\Scripts\pip.exe show uvicorn | findstr Version)"
# Display the current dependencies
.PHONY: dependencies
dependencies:
	@venv\Scripts\pip.exe freeze
	@echo "Installed dependencies:"
	@venv\Scripts\pip.exe freeze | sort
# Display the current environment variables



.PHONY: git
git:
	@git add .
	@git status
	@git commit -m "Update"
	@git push
# Display the current environment variables