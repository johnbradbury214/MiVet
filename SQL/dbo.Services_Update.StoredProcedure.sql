USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Services_Update]    Script Date: 10/31/2022 6:03:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <John Bradbury>
-- Create date: <09/21/2022>
-- Description: <A proc to update a record in the dbo.Services table>
-- Code Reviewer:

-- MODIFIED BY: Author
-- MODIFIED DATE: 9/27
-- Code Reviewer: Donald Mondragon
-- Note: Removed 4 columns from table and updated proc accordingly
-- =============================================
CREATE proc [dbo].[Services_Update] @ServiceTypeId int
								  ,@Name nvarchar(200)
								  ,@Description nvarchar(500)
								  ,@Total decimal(7,2)
								  ,@ServiceCode nvarchar(10)
								  ,@UserId int
								  ,@Id int 		
as

/* ----- Test Code -----

DECLARE @Id int = 5
EXECUTE [dbo].[Services_Select_ById] @Id

DECLARE @ServiceTypeId int = 1
		,@Name nvarchar(200) = 'Updated Test Name'
		,@Description nvarchar(500) = 'Test Description'
		,@Total decimal(7,2) = 1000
		,@ServiceCode nvarchar(10) = 'ABC'
		,@UserId int = 30
		

EXECUTE [dbo].[Services_Update] @ServiceTypeId
							   ,@Name
							   ,@Description
							   ,@Total
							   ,@ServiceCode
							   ,@UserId
							   ,@Id 

EXECUTE [dbo].[Services_Select_ById] @Id

*/

BEGIN

	DECLARE @dateNow datetime2 = getutcdate();

	UPDATE [dbo].[Services] 
	SET [ServiceTypeId] = @ServiceTypeId
	   ,[Name] = @Name
	   ,[Description] = @Description
	   ,[Total] = @Total
	   ,[ServiceCode] = @ServiceCode
	   ,[ModifiedBy] = @UserId
	   ,[DateModified] = @dateNow

	WHERE Id = @Id
	
END
GO
