USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Services_Select_ById]    Script Date: 10/31/2022 6:03:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <John Bradbury>
-- Create date: <09/21/2022>
-- Description: <A proc to select a record by Id from dbo.Services table>
-- Code Reviewer:

-- MODIFIED BY: Author
-- MODIFIED DATE: 9/27
-- Code Reviewer: Donald Mondragon
-- Note: Removed 4 columns from table and updated proc accordingly
-- =============================================
CREATE PROC [dbo].[Services_Select_ById]
			@Id int
as

/* ----- Test Code -----

DECLARE @Id int = 5

EXECUTE [dbo].[Services_Select_ById]
		@Id

*/

BEGIN

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

FROM [dbo].[Services] as s join [dbo].[ServiceTypes] as st
on [s].[ServiceTypeId] = [st].[Id]
inner join [dbo].[Users] as u
on u.Id = s.CreatedBy

WHERE [s].[Id] = @Id

END
GO
