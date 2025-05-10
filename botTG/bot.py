from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext

async def start(update: Update, context: CallbackContext) -> None:
    await update.message.reply_text(
        "Привет! Я помогу создать SQL-запрос. Скажи, какие данные тебе нужны? Например: 'SELECT name, age FROM users WHERE age > 30'."
    )

async def handle_message(update: Update, context: CallbackContext) -> None:
    message = update.message.text.lower()
    columns = []
    table = None
    conditions = []

    if 'select' in message:
        columns_str = message.split('select')[1].split('from')[0].strip()
        columns = [col.strip() for col in columns_str.split(',')]
        
        if 'from' in message:
            table = message.split('from')[1].split('where')[0].strip()

        if 'where' in message:
            conditions = message.split('where')[1].strip().split(' ')

        if table:
            sql_query = f"SELECT {', '.join(columns)} FROM {table}"
            if conditions:
                sql_query += f" WHERE {' '.join(conditions)}"
            
            await update.message.reply_text(f"Вот ваш запрос: {sql_query}")
        else:
            await update.message.reply_text("Не указана таблица в запросе. Попробуйте снова.")
    else:
        await update.message.reply_text("Не могу понять ваш запрос. Попробуйте снова.")

def main():
    token = '8073336584:AAHIs2AXxcwvufa_qT5OUwWIkqv5TOnPAzM'
    application = Application.builder().token(token).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    application.run_polling()

if __name__ == '__main__':
    main()
