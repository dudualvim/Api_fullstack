# Dockerfile do backend
FROM python:3.10

# Instala o netcat-openbsd
RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

# Copia e instala as dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código
COPY . .

# Copia o script wait-for-it e concede permissão de execução
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Define a variável de ambiente PYTHONPATH
ENV PYTHONPATH=/app

# Define o comando para rodar o initial_setup.py e depois iniciar o servidor
CMD ["./wait-for-it.sh", "db", "3306", "--", "sh", "-c", "python app/db/initial_setup.py && uvicorn app.main:app --host 0.0.0.0 --port 8000"]