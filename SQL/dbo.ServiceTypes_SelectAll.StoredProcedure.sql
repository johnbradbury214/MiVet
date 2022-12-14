USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[ServiceTypes_SelectAll]    Script Date: 10/31/2022 6:03:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <John Bradbury>
-- Create date: <09/21/2022>
-- Description: <A proc to select all records from dbo.ServiceTypes table. This table for assigning an Id value to a service.>
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: Donald Mondragon
-- Note:
-- =============================================
CREATE PROC [dbo].[ServiceTypes_SelectAll]
								
/* ----- Test Code -----

		EXECUTE dbo.ServiceTypes_SelectAll 

*/

as

BEGIN
			SELECT [Id]
				  ,[Name]
			  FROM [dbo].[ServiceTypes]

			ORDER BY Id

END
GO
