USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Services_Delete_ById]    Script Date: 9/27/2022 4:32:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <John Bradbury>
-- Create date: <09/21/2022>
-- Description: <A proc to delete (update IsActive to 0) a record from the dbo.Services table>
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: Donald Mondragon
-- Note:
-- =============================================
CREATE PROC [dbo].[Services_Delete_ById] @Id int
as
/* ----- Test Code -----
	DECLARE @Id int = 1

	SELECT *
	FROM [dbo].[Services]
	WHERE Id = @Id

	EXECUTE [dbo].[Services_Delete_ById] @Id

	SELECT *
	FROM [dbo].[Services]
	WHERE Id = @Id

*/

BEGIN
	
	DECLARE @dateNow datetime2 = getutcdate()

	UPDATE [dbo].[Services]
	Set [IsActive] = 0
	   ,[DateModified] = @dateNow
	WHERE Id = @Id

END
GO
