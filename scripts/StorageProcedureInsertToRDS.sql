CREATE OR REPLACE FUNCTION insert_into_expenses()
RETURNS TRIGGER AS $$
BEGIN
    -- Only process transactions with "APPROVED" authorization_status
    IF NEW.authorization_status = 'APPROVED' THEN
        INSERT INTO expenses (user_id, expense, category, timestamp)
        VALUES (
            NEW.customer_id,    -- Map customer_id to user_id
            NEW.amount,         -- Map amount to expense
            NEW.remarks,        -- Map remarks to category
            NEW.timestamp       -- Map timestamp to timestamp
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_insert_transactions
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION insert_into_expenses();
