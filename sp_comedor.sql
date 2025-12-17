USE [comedorG3T]
GO
/****** Object:  StoredProcedure [dbo].[PA_ComedorG3T]    Script Date: 16/12/2025 10:06:57 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[PA_ComedorG3T]
 @jsonParametros NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @strOpcion VARCHAR(10), 
			@strUsuario VARCHAR(30),
			@intFirma	bigint

    BEGIN
        -- Configurar formato de fecha
        SET LANGUAGE Spanish;

        -- Extraer valores del JSON
        SELECT  @strOpcion  = JSON_VALUE(@jsonParametros, '$.Opcion'),
                @strUsuario = JSON_VALUE(@jsonParametros, '$.Usuario'),
                @intFirma   = JSON_VALUE(@jsonParametros, '$.Firma');

        If @strOpcion = 'CD'
        Begin 
            /* Info dashboard */
            Select 
                count(CON_Id) As ENTREGAS_DIA
            From RH_Consumos;

            /* Empleados Activos */
            Select 
                count(EMP_NumEmpleado) AS EMPLEADOS_ACTIVOS
            From RH_Empleados;

            return
        End

        If @strOpcion = 'CE'
        Begin 
            /* Usuario por gafete*/
            Select 
                EMP_NumEmpleado AS NUMERO_EMPLEADO,
                EMP_NombreInterno AS NOMBRE, 
                EMP_Departamento AS DEPARTAMENTO
            From RH_Empleados
            Where EMP_Firma = @intFirma;
            return 
        End

		If @strOpcion = 'C'
		Begin
            /* Articulos */
			Select
                ART_Id     AS id,
                ART_Nombre AS NOMBRE,
                ART_Precio AS PRECIO,
                ART_Img    AS IMG
            From RH_Articulos
            Where ART_Activo = 1;
		End
    END
END
