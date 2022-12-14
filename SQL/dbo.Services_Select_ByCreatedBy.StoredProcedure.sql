USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Services_Select_ByCreatedBy]    Script Date: 10/31/2022 6:03:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <John Bradbury>
-- Create date: <09/21/2022>
-- Description: <A proc to select a record by CreatedBy from dbo.Services table>
-- Code Reviewer:

-- MODIFIED BY: Author
-- MODIFIED DATE: 9/27
-- Code Reviewer: Donald Mondragon
-- Note: Removed 4 columns from table and updated proc accordingly.
-- =============================================
CREATE PROC [dbo].[Services_Select_ByCreatedBy] @PageSize int
											   ,@PageIndex int
											   ,@UserId int
as

/* ----- Test Code -----

Declare @PageSize int = 5
	   ,@PageIndex int = 0
	   ,@UserId int = 30

EXECUTE [dbo].[Services_Select_ByCreatedBy] @PageSize
										   ,@PageIndex
										   ,@UserId

*/

BEGIN

	DECLARE @Offset int = @PageSize * @PageIndex

	SELECT s.[Id]
		  ,st.[Name] as ServiceType
		  ,s.[Name]
		  ,s.[Description]
		  ,s.[Total]
		  ,s.[ServiceCode]
		  ,s.[IsActive]
		  ,s.[DateCreated]
		  ,s.[DateModified]
		  ,u.[Id] as UserId 
		  ,s.[ModifiedBy]
		  ,TotalCount = COUNT(1)OVER()

	FROM [dbo].[Services] as s inner join [dbo].[ServiceTypes] as st
					      on [s].[ServiceTypeId] = [st].[Id]
						  inner join [dbo].[Users] as u
						  on s.CreatedBy = u.Id
	WHERE [s].[CreatedBy] = @UserId
	ORDER BY UserId

	OFFSET @Offset ROWS 
	FETCH NEXT @PageSize ROWS ONLY

END
GO
