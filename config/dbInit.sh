#!/bin/bash
echo 'logging into db root as techblog'
mysql -u root --password="C@rri11o"  << EOF
SOURCE db/schema.sql;
quit
EOF
echo 'Successfully initialized Database'