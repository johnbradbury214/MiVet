USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[ServiceTypes_Delete_ById]    Script Date: 10/31/2022 6:03:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <John Bradbury>
-- Create date: <10/14/2022>
-- Description: <A proc to delete a record into the dbo.ServiceTypes table>
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE PROC [dbo].[ServiceTypes_Delete_ById] @Id int

/* ----- Test Code -----

Declare @Id int = 13

EXECUTE [dbo].[ServiceTypes_Delete_ById] @Id

SELECT * from [dbo].[ServiceTypes]

*/

AS

BEGIN

DELETE FROM [dbo].[ServiceTypes]

WHERE Id = @Id

END
GO
