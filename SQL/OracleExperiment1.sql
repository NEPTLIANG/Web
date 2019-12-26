--2.
select username, account_status from dba_users;
alter user scott account unlock;
alter user scott identified by tiger;
select username, account_status from dba_users
where username = ‘SCOTT’;

--3.
column name format A50;
select file#, name, checkpoint_change#
from v$datafile;
column name format A50;
select name from v$controlfile;
column member format a50;
select member from v$logfile;

--4.
select tablespace_name from dba_tablespaces;
select * from dba_tables where owner=’SCOTT’;
column host_name format a20;
select instance_name, host_name, status
from v$instance;