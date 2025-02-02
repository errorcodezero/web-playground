FROM denoland/deno:2.1.9

EXPOSE 8000

WORKDIR /app

USER deno

COPY . .

CMD ["task", "start"]
