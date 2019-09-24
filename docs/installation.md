Create mysql database

```
$ mysql -u root -p

mysql> create database democracy_revisited;
Query OK, 1 row affected (0.01 sec)

mysql> CREATE USER 'druser'@'localhost' IDENTIFIED BY 'somepwd';
Query OK, 0 rows affected (0.01 sec)

mysql> GRANT ALL PRIVILEGES ON democracy_revisited.* TO 'druser'@'localhost';
Query OK, 0 rows affected (0.00 sec)

```
