# codegolf
Javascript Code Golf Web Platform

Installation:

This site requires a LAMP stack with at least PHP 5.3 or later.

1. Create a database in MySQL. Make a note of the db name and user with access rights.
2. Run the SQL in dbInit.sql to create the necessary tables and fields.
3. Edit codegolfSSL/db.php. Enter the db name, user and password.
4. Also in db.php, you must provide the primary domain and the applet domain (they run separately for sandboxing purposes)

Questions? Email the author s.r.mcgann@hotmail.com
