USE db;

-- Create function
DELIMITER //

CREATE FUNCTION get_last_day_of_month(tempo_mes VARCHAR(2), tempo_ano VARCHAR(4))
RETURNS DATE
DETERMINISTIC
READS SQL DATA
BEGIN
    RETURN LAST_DAY(CONCAT(tempo_ano, '-', tempo_mes, '-01'));
END //

DELIMITER ;

-- Create trigger agua
DELIMITER //

CREATE TRIGGER trg_CheckConsumoAgua
AFTER INSERT ON fato_conta_agua
FOR EACH ROW
BEGIN
    DECLARE media_trimestral DECIMAL(8, 2);
    DECLARE data_consumo DATE;

    --  Obtém a data de consumo com base no tempo_id
    SELECT get_last_day_of_month(tempo_mes, tempo_ano) INTO data_consumo
    FROM tempo
    WHERE tempo_id = NEW.tempo_id;

    --  Calcula a média trimestral dos últimos 3 meses
    SELECT AVG(total_consumo_agua) INTO media_trimestral
    FROM fato_conta_agua
    WHERE unidade_cliente_id = NEW.unidade_cliente_id
      AND local_planta_id = NEW.local_planta_id
      AND tempo_id IN (
          SELECT tempo_id
          FROM tempo
          WHERE STR_TO_DATE(CONCAT(tempo_ano, '-', tempo_mes, '-01'), '%Y-%m-%d') >= DATE_SUB(data_consumo, INTERVAL 3 MONTH)
      );

    --  Verifica se o consumo atual é 30% maior que a média trimestral
    IF NEW.total_consumo_agua > media_trimestral * 1.30 THEN
        INSERT INTO alertas_consumo_agua (
            contrato_agua_id,
            unidade_cliente_id,
            local_planta_id,
            data_alerta,
            consumo_atual,
            media_trimestral,
            excesso_percentual
        )
        VALUES (
            NEW.contrato_agua_id,
            NEW.unidade_cliente_id,
            NEW.local_planta_id,
            data_consumo,
            NEW.total_consumo_agua,
            media_trimestral,
            ((NEW.total_consumo_agua - media_trimestral) / media_trimestral) * 100
        );
    END IF;
END //

DELIMITER ;

-- Create trigger esgoto
DELIMITER //

CREATE TRIGGER trg_CheckConsumoEsgoto
AFTER INSERT ON fato_conta_agua
FOR EACH ROW
BEGIN
    DECLARE media_trimestral_esgoto DECIMAL(8, 2);
    DECLARE data_consumo DATE;

    --  Obtém a data de consumo com base no tempo_id
    SELECT get_last_day_of_month(tempo_mes, tempo_ano) INTO data_consumo
    FROM tempo
    WHERE tempo_id = NEW.tempo_id;

    --  Calcula a média trimestral dos últimos 3 meses para consumo de esgoto
    SELECT AVG(total_consumo_esgoto) INTO media_trimestral_esgoto
    FROM fato_conta_agua
    WHERE unidade_cliente_id = NEW.unidade_cliente_id
      AND local_planta_id = NEW.local_planta_id
      AND tempo_id IN (
          SELECT tempo_id
          FROM tempo
          WHERE STR_TO_DATE(CONCAT(tempo_ano, '-', tempo_mes, '-01'), '%Y-%m-%d') >= DATE_SUB(data_consumo, INTERVAL 3 MONTH)
      );

    --  Verifica se o consumo atual de esgoto é 30% maior que a média trimestral
    IF NEW.total_consumo_esgoto > media_trimestral_esgoto * 1.30 THEN
        INSERT INTO alertas_consumo_esgoto (
            contrato_agua_id,
            unidade_cliente_id,
            local_planta_id,
            data_alerta,
            consumo_atual,
            media_trimestral,
            excesso_percentual
        )
        VALUES (
            NEW.contrato_agua_id,
            NEW.unidade_cliente_id,
            NEW.local_planta_id,
            data_consumo,
            NEW.total_consumo_esgoto,
            media_trimestral_esgoto,
            ((NEW.total_consumo_esgoto - media_trimestral_esgoto) / media_trimestral_esgoto) * 100
        );
    END IF;
END //

DELIMITER ;

-- Create trigger energia a
DELIMITER //

CREATE TRIGGER trg_CheckConsumoEnergiaA
AFTER INSERT ON fato_conta_energia
FOR EACH ROW
BEGIN
    DECLARE media_trimestral_a DECIMAL(8, 2);
    DECLARE data_consumo DATE;

--  Obtém a data de consumo com base no tempo_id
    SELECT get_last_day_of_month(tempo_mes, tempo_ano) INTO data_consumo
    FROM tempo
    WHERE tempo_id = NEW.tempo_id;

--  Calcula a média trimestral dos últimos 3 meses para consumo de energia A
    SELECT AVG(consumo_total_a) INTO media_trimestral_a
    FROM fato_conta_energia
    WHERE unidade_cliente_id = NEW.unidade_cliente_id
      AND local_planta_id = NEW.local_planta_id
      AND tempo_id IN (
          SELECT tempo_id
          FROM tempo
          WHERE STR_TO_DATE(CONCAT(tempo_ano, '-', tempo_mes, '-01'), '%Y-%m-%d') >= DATE_SUB(data_consumo, INTERVAL 3 MONTH)
      );

--  Verifica se o consumo atual de energia A é 30% maior que a média trimestral
    IF NEW.consumo_total_a > media_trimestral_a * 1.30 THEN
        INSERT INTO alertas_consumo_energia_a (
            contrato_energia_id,
            unidade_cliente_id,
            local_planta_id,
            data_alerta,
            consumo_atual,
            media_trimestral,
            excesso_percentual
        )
        VALUES (
            NEW.contrato_energia_id,
            NEW.unidade_cliente_id,
            NEW.local_planta_id,
            data_consumo,
            NEW.consumo_total_a,
            media_trimestral_a,
            ((NEW.consumo_total_a - media_trimestral_a) / media_trimestral_a) * 100
        );
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER trg_CheckConsumoEnergiaB
AFTER INSERT ON fato_conta_energia
FOR EACH ROW
BEGIN
    DECLARE media_trimestral_b DECIMAL(8, 2);
    DECLARE data_consumo DATE;

--  Obtém a data de consumo com base no tempo_id
    SELECT get_last_day_of_month(tempo_mes, tempo_ano) INTO data_consumo
    FROM tempo
    WHERE tempo_id = NEW.tempo_id;

--  Calcula a média trimestral dos últimos 3 meses para consumo de energia B
    SELECT AVG(consumo_total_b) INTO media_trimestral_b
    FROM fato_conta_energia
    WHERE unidade_cliente_id = NEW.unidade_cliente_id
      AND local_planta_id = NEW.local_planta_id
      AND tempo_id IN (
          SELECT tempo_id
          FROM tempo
          WHERE STR_TO_DATE(CONCAT(tempo_ano, '-', tempo_mes, '-01'), '%Y-%m-%d') >= DATE_SUB(data_consumo, INTERVAL 3 MONTH)
      );

--  Verifica se o consumo atual de energia B é 30% maior que a média trimestral
    IF NEW.consumo_total_b > media_trimestral_b * 1.30 THEN
        INSERT INTO alertas_consumo_energia_b (
            contrato_energia_id,
            unidade_cliente_id,
            local_planta_id,
            data_alerta,
            consumo_atual,
            media_trimestral,
            excesso_percentual
        )
        VALUES (
            NEW.contrato_energia_id,
            NEW.unidade_cliente_id,
            NEW.local_planta_id,
            data_consumo,
            NEW.consumo_total_b,
            media_trimestral_b,
            ((NEW.consumo_total_b - media_trimestral_b) / media_trimestral_b) * 100
        );
    END IF;
END //

DELIMITER ;