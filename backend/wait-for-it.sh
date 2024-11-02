#!/usr/bin/env bash
host="$1"
port="$2"
shift 2

# Aguarda até que o banco de dados esteja disponível
until nc -z "$host" "$port"; do
    echo "Waiting for $host:$port..."
    sleep 1
done

# Aguardar mais 5 segundos após a conexão bem-sucedida
echo "$host:$port is available, waiting an additional 5 seconds..."
sleep 5

# Executa o comando original
exec "$@"
