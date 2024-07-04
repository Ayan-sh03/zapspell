CREATE OR REPLACE FUNCTION update_results_on_attempt()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the results row for the user
    UPDATE results
    SET
        correct_spellings = correct_spellings + CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
        total_attempts = total_attempts + 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = NEW.user_id;

    -- If no row was updated, it means there's no entry for this user yet
    -- In this case, we insert a new row
    IF NOT FOUND THEN
        INSERT INTO results (user_id, correct_spellings, total_attempts, updated_at)
        VALUES (
            NEW.user_id,
            CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
            1,
            CURRENT_TIMESTAMP
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER after_attempt_insert
AFTER INSERT ON attempts
FOR EACH ROW
EXECUTE FUNCTION update_results_on_attempt();