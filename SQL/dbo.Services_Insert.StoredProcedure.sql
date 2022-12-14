USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Services_Insert]    Script Date: 10/31/2022 6:03:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <John Bradbury>
-- Create date: <09/21/2022>
-- Description: <A proc to insert a record into the dbo.Services table>
-- Code Reviewer:

-- MODIFIED BY: Author
-- MODIFIED DATE: 9/27
-- Code Reviewer: Donald Mondragon
-- Note: Removed 4 columns from table and updated proc accordingly.
-- =============================================
CREATE PROC [dbo].[Services_Insert] @ServiceTypeId int
								   ,@Name nvarchar(200)
								   ,@Description nvarchar(500)
								   ,@Total decimal(7,2)
								   ,@ServiceCode nvarchar(10)
								   ,@UserId int
								   ,@Id int OUTPUT
as

/* ----- Test Code -----

SELECT *
FROM dbo.Services

DECLARE @ServiceTypeId int = 1
	   ,@Name nvarchar(200) = 'Test Name'
	   ,@Description nvarchar(500) = 'Test Description'
	   ,@Total decimal(7,2) = 1000
	   ,@ServiceCode nvarchar(10) = 'Test Code'
	   ,@UserId int = 1 
	   ,@Id int

EXECUTE [dbo].[Services_Insert] @ServiceTypeId
							   ,@Name
							   ,@Description
							   ,@Total
							   ,@ServiceCode
							   ,@UserId
							   ,@Id OUTPUT
SELECT *
FROM dbo.Services

*/

BEGIN

DECLARE @DateNow datetime2 = getutcdate()

	INSERT INTO [dbo].[Services] ([ServiceTypeId]
							     ,[Name]
							     ,[Description]
							     ,[Total]
							     ,[ServiceCode]
								 ,[DateCreated]
								 ,[DateModified]
								 ,[CreatedBy]
								 ,[ModifiedBy])
	VALUES (@ServiceTypeId
		   ,@Name
		   ,@Description
		   ,@Total
		   ,@ServiceCode
		   ,@DateNow
		   ,@DateNow
		   ,@UserId
		   ,@UserId)

	SET @Id = SCOPE_IDENTITY()

END
GO
