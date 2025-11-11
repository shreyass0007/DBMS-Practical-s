CREATE TABLE student(
    student_id NUMBER  PRIMARY KEY,
    student_name VARCHAR2(50),
    marks NUMBER,
    grade VARCHAR2(30)
);
-- Write a Stored Procedure namely proc_Grade for the categorization of student. If marks 
-- scored by students in examination is <=1500 and marks>=990 then student will be placed in 
-- distinction category if marks scored are between 989 and 900 category is first class, if marks 
-- 899 and 825 category is Higher Second Class. Write a PL/SQL block for using procedure 
-- created with above requirement.

CREATE OR REPLACE PROCEDURE proc_Grade(
    p_student_id IN NUMBER
)
AS
    v_marks NUMBER;
    v_grade VARCHAR2(30);
BEGIN
    SELECT marks 
    INTO v_marks 
    FROM student 
    WHERE student_id = p_student_id;

    IF v_marks BETWEEN 990 AND 1500 THEN
        v_grade := 'Distinction';
    ELSIF v_marks BETWEEN 900 AND 989 THEN
        v_grade := 'First Class';
    ELSIF v_marks BETWEEN 825 AND 899 THEN
        v_grade := 'Higher Second Class';
    ELSE
        v_grade := 'Not Classified';
    END IF;

    UPDATE student 
    SET grade = v_grade
    WHERE student_id = p_student_id;

    DBMS_OUTPUT.PUT_LINE('Student ID: ' || p_student_id || ' -> ' || v_grade);
END proc_Grade;
/


SET SERVEROUTPUT ON;
BEGIN
    proc_Grade(1);
    proc_Grade(2);
    proc_Grade(3);
    proc_Grade(4);
END;
/


SELECT * FROM student;
