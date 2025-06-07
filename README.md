
A trivia-based combat game where players answer questions to battle opponents. The project is organized into backend and frontend directories for modular development.

## Folder Structure

```
trivia-combat-game/
├── backend/
│   ├── app.py
│   └── questions.json
├── frontend/
│   ├── game.js
│   ├── index.html
│   └── styles.css
├── .gitignore
├── LICENSE
├── Makefile
├── README.md
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Elliot-Nzei/trivia-combat-game.git
cd trivia-combat-game
```

### Using the Makefile

This project includes a `Makefile` to help you set up and run the backend easily (Windows commands). Common tasks include:

- **Install dependencies and set up the virtual environment:**  
    ```bash
    make install
    ```

- **Run the FastAPI backend:**  
    ```bash
    make run
    ```

- **Activate the virtual environment:**  
    ```bash
    venv\Scripts\activate
    ```

- **Deactivate the virtual environment:**  
    ```bash
    deactivate
    ```

- **See all available commands:**  
    ```bash
    make help
    ```

Other commands are available for cleaning up, checking versions, and managing dependencies. See the `Makefile` for details.

See the README files inside `backend/` and `frontend/` for setup and usage instructions.

## License

See the [LICENSE](LICENSE) file for license information.

