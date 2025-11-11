CREATE TABLE Borrower (
  Rollin       VARCHAR2(20),
  Name         VARCHAR2(50),
  DateofIssue  DATE,
  NameofBook   VARCHAR2(100),
  Status       CHAR(1)   -- 'I' = Issued, 'R' = Returned
);

CREATE TABLE Fine (
  Roll_no  VARCHAR2(20),
  "Date"   DATE,
  Amt      NUMBER(10,2)
);
-- Book issued 10 days ago → No fine
INSERT INTO Borrower VALUES ('202501', 'Amit Kumar', SYSDATE - 10, 'Database Systems', 'I');

-- Book issued 20 days ago → Fine of (20 - 15) * 5 = Rs. 25
INSERT INTO Borrower VALUES ('202502', 'Riya Sharma', SYSDATE - 20, 'Operating Systems', 'I');

-- Book issued 40 days ago → Fine of (15 * 5) + (40 - 30) * 50 = Rs. 575
INSERT INTO Borrower VALUES ('202503', 'Rahul Mehta', SYSDATE - 40, 'Computer Networks', 'I');

COMMIT;

CREATE OR REPLACE PROCEDURE return_book (
  p_rollin   IN VARCHAR2,
  p_bookname IN VARCHAR2
) AS
  v_dateissue   DATE;
  v_status      VARCHAR2(1);
  v_days        INTEGER;
  v_fine_amt    NUMBER := 0;
  e_not_found           EXCEPTION;
  e_already_returned    EXCEPTION;
BEGIN
  BEGIN
    SELECT DateofIssue, Status
      INTO v_dateissue, v_status
      FROM Borrower
     WHERE Rollin = p_rollin
       AND NameofBook = p_bookname
     FOR UPDATE;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      RAISE e_not_found;
  END;

  IF v_status = 'R' THEN
    RAISE e_already_returned;
  END IF;

  v_days := TRUNC(SYSDATE) - TRUNC(v_dateissue);

  IF v_days <= 15 THEN
    v_fine_amt := 0;
  ELSIF v_days <= 30 THEN
    v_fine_amt := (v_days - 15) * 5;
  ELSE
    v_fine_amt := (15 * 5) + ((v_days - 30) * 50);
  END IF;

  UPDATE Borrower
     SET Status = 'R'
   WHERE Rollin = p_rollin
     AND NameofBook = p_bookname;

  IF v_fine_amt > 0 THEN
    INSERT INTO Fine (Roll_no, "Date", Amt)
    VALUES (p_rollin, TRUNC(SYSDATE), v_fine_amt);
  END IF;

  COMMIT;

  DBMS_OUTPUT.PUT_LINE('Return processed for Rollin=' || p_rollin || ', Book=' || p_bookname);
  DBMS_OUTPUT.PUT_LINE('Days since issue: ' || v_days);
  IF v_fine_amt > 0 THEN
    DBMS_OUTPUT.PUT_LINE('Fine recorded: Rs. ' || TO_CHAR(v_fine_amt));
  ELSE
    DBMS_OUTPUT.PUT_LINE('No fine applicable.');
  END IF;

EXCEPTION
  WHEN e_not_found THEN
    DBMS_OUTPUT.PUT_LINE('ERROR: No borrower record found.');
  WHEN e_already_returned THEN
    DBMS_OUTPUT.PUT_LINE('NOTICE: Book already returned.');
  WHEN OTHERS THEN
    ROLLBACK;
    DBMS_OUTPUT.PUT_LINE('Unhandled error: ' || SQLERRM);
END return_book;
/
