USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[ServiceTypes_Insert]    Script Date: 10/31/2022 6:03:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <John Bradbury>
-- Create date: <10/14/2022>
-- Description: <A proc to insert a record into the dbo.ServiceTypes table>
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE PROC [dbo].[ServiceTypes_Insert] @Name nvarchar(100)
									   ,@UserId int
									   ,@Id int OUTPUT
as
/* ----- Test Code -----

SELECT *
FROM [dbo].[ServiceTypes]

DECLARE @Name nvarchar(100) = 'Custom Service Type Test'
       ,@UserId int = 30
	   ,@id int

EXECUTE [dbo].[ServiceTypes_Insert] @Name
								   ,@UserId
								   ,@Id OUTPUT

SELECT *
FROM [dbo].[ServiceTypes]
*/

BEGIN
INSERT INTO [dbo].[ServiceTypes] ([Name]
								 ,[UserId])
VALUES (@Name
      ,@UserId)

SET @Id = SCOPE_IDENTITY()

END
GO
