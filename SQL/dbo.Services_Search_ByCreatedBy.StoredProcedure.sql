USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Services_Search_ByCreatedBy]    Script Date: 10/31/2022 6:03:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <John Bradbury>
-- Create date: <09/21/2022>
-- Description: <A proc to search for a record by CreatedBy in the dbo.Services table>
-- Code Reviewer: 

-- MODIFIED BY: Author
-- MODIFIED DATE: 9/27
-- Code Reviewer: Donald Mondragon
-- Note: Removed 4 columns from table and updated proc accordingly.
-- =============================================
CREATE PROC [dbo].[Services_Search_ByCreatedBy] @PageIndex int
											  ,@PageSize int
								              ,@Query nvarchar(100)
										
as

/* ----- Test Code -----

DECLARE @PageIndex int = 0
	   ,@PageSize int = 5
	   ,@Query nvarchar(100) = 'test'
EXECUTE [dbo].[Services_Search_ByCreatedBy] @PageIndex
											,@PageSize
											,@Query

*/

BEGIN

DECLARE @offset int = @PageIndex * @PageSize

SELECT s.[Id]
	  ,st.[Name] as ServiceType
	  ,s.[Name]
	  ,s.[Description]
	  ,s.[Total]
	  ,s.[ServiceCode]
	  ,s.[IsActive]
	  ,s.[DateCreated]
	  ,s.[DateModified]
	  ,s.[CreatedBy]
	  ,u.[FirstName]
	  ,u.[LastName]
	  ,s.[ModifiedBy]
	  ,TotalCount = COUNT(1) OVER()
			
FROM [dbo].[Services] as s inner join [dbo].[ServiceTypes] as st
					  on [s].[ServiceTypeId] = [st].[Id]
					  inner join [dbo].[Users] as u
					  on s.CreatedBy = u.Id
WHERE (u.FirstName LIKE '%' + @Query + '%')
OR (u.LastName LIKE '%' + @Query + '%')
ORDER BY s.Id

OFFSET @offset Rows
Fetch Next @PageSize Rows ONLY

END
GO
