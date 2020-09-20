CREATE PROCEDURE newsAddOrEdit (
  IN _id INT,
  IN _headline VARCHAR(45),
  IN _author VARCHAR(45),
  IN _content VARCHAR(45),
  IN _creationDate DATE,
  IN _updateDate DATE
)
BEGIN 
	IF _id = 0 THEN
		INSERT INTO employee (headline, author, content, creationDate, updateDate)
        VALUES (_headline, _author,_content,_creationDate,_updateDate);
		SET _id = last_insert_id();
	ELSE
		UPDATE news
        SET
			headline =  _name,
            author = _author,
            content = _content,
            creationDate = _creationDate,
            updateDate = _updateDate
            WHERE id = _id;
	END IF;
    
    SELECT _id AS id;
END