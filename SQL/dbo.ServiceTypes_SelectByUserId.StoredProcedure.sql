USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[ServiceTypes_SelectByUserId]    Script Date: 10/31/2022 6:03:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <John Bradbury>
-- Create date: <10/27/2022>
-- Description: <A proc to select both default service types as well as ones generated by the currently logged in user>
-- Code Reviewer: Donald Mondragon

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note:
-- =============================================
CREATE PROC [dbo].[ServiceTypes_SelectByUserId] @UserId int
								
/* ----- Test Code -----

DECLARE @UserId int = 30

EXECUTE [dbo].[ServiceTypes_SelectByUserId] @UserId

*/

as

BEGIN
			SELECT [Id]
			      ,[Name]
			FROM [dbo].[ServiceTypes]
			WHERE UserId = @UserId

			ORDER BY Id

END
GO
