USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Services_SelectAll]    Script Date: 10/31/2022 6:03:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <John Bradbury>
-- Create date: <09/21/2022>
-- Description: <A proc to select all records from dbo.Services table>
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: Donald Mondragon
-- Note:
-- =============================================
CREATE PROC [dbo].[Services_SelectAll]
								@PageIndex int
							   ,@PageSize int								
								
as 

/* ----- Test Code -----

DECLARE @pageIndex int = 0
	   ,@pageSize int = 10

EXECUTE dbo.Services_SelectAll @PageIndex
						      ,@PageSize

*/

BEGIN 

	DECLARE @offset int = @pageIndex * @pageSize

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
		  ,s.[ModifiedBy]
		  ,TotalCount = COUNT(1) OVER()

	FROM [dbo].[Services] as s inner join [dbo].[ServiceTypes] as st
	ON s.ServiceTypeId = st.Id
	inner join [dbo].[Users] as u
	on u.Id = s.CreatedBy

	ORDER BY s.[Id]
				
	OFFSET @offset ROWS
	FETCH NEXT @pageSize ROWS ONLY

END
GO
