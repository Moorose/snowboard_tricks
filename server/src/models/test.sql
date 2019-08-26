
CREATE TABLE IF NOT EXISTS "trick"
("id"   SERIAL ,
"name" VARCHAR(255) NOT NULL UNIQUE,
 "complexity" INTEGER NOT NULL, "
description"
 VARCHAR(255) NOT NULL, PRIMARY KEY ("id"));

SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_in
dexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t
.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'trick' GROUP BY i.relname, ix.indexrelid, ix.indi
sprimary, ix.indisunique, ix.indkey ORDER BY i.relname;

CREATE TABLE IF NOT EXISTS "user" ("id"   SERIAL ,
"nickname" VARCHAR(255) NOT NULL UNIQUE,
"fullName" VARCHAR(255) NOT NULL,
 "email" VARCHAR(255) NOT NULL UNIQUE,
 "description" VARCHAR(255) NOT NULL, PRIMARY KEY ("id"));

SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_in
dexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t
.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'user' GROUP BY i.relname, ix.indexrelid, ix.indis
primary, ix.indisunique, ix.indkey ORDER BY i.relname;

CREATE TABLE IF NOT EXISTS "user_trick" ("id"   SERIAL , "is_done" BOOLEAN NOT NULL,
 "UserId" INTEGER REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
 "TrickId" INTEGER REFERENCES "trick" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE ("UserId", "TrickId"), PRIMARY KEY ("id"));

SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_in
dexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t
.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'user_trick' GROUP BY i.relname, ix.indexrelid, ix
.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;

CREATE TABLE IF NOT EXISTS "thread" (
"id"   SERIAL ,
 "user_id" INTEGER NOT NULL,
  "trick_id" INTEGER NOT NULL,
   "UserTrickId" INTEGER
   REFERENCES "user_trick" ("id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id"));

SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_in
dexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t
.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'thread' GROUP BY i.relname, ix.indexrelid, ix.ind
isprimary, ix.indisunique, ix.indkey ORDER BY i.relname;

CREATE TABLE IF NOT EXISTS "thread_participant" (
"id"   SERIAL ,
 "in_thread" BOOLEAN NOT NULL,
 "UserId" INTEGER REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
 "ThreadId" INTEGER REFERENCES "thread" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE ("UserId", "ThreadId"),
 PRIMARY KEY ("id"));

SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_in
dexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t
.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'thread_participant' GROUP BY i.relname, ix.indexr
elid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;

CREATE TABLE IF NOT EXISTS "message" (
"id"   SERIAL ,
"body" VARCHAR(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
 "UserId" INTEGER REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
"ThreadId" INTEGER REFERENCES
 "thread" ("id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id"));

SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_in
dexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t
.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'message' GROUP BY i.relname, ix.indexrelid, ix.in
disprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
