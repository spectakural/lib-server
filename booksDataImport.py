import psycopg2
import pandas as pd

con = psycopg2.connect(
database="liberatti",
user="dev",
password="root",
host="localhost",
port= '5432'
)

cursor_obj = con.cursor()

def func(s):
    return s[1:-1]

# df = pd.read_csv("./books_data/books.csv")
df = open("./books_data/books.csv","r")
l = df.readline()
for i in range(1,21):
    l = list(map(str,df.readline()[:-1].split(";")))
    # cursor_obj.execute(f'insert into books(name, author, publisher, yearofpub, availability, isbn, image_url_s, image_url_m, image_url_l) values({l[1]}, {l[2]}, {l[4]}, {int(l[3][1:-1])}, 10, {l[0]}, {l[5]}, {l[6]}, {l[7]})')
    cursor_obj.execute(f'insert into books(name, author, publisher, yearofpub, availability, isbn, image_url_s, image_url_m, image_url_l) values(%s,%s,%s,%s,%s,%s,%s,%s,%s)',[l[1], l[2], l[4], int(l[3][1:-1]), 10, l[0], l[5], l[6], l[7]])
    print(l)

con.commit()