USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[ServiceTypes_Select_ById]    Script Date: 10/31/2022 6:03:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Camden Rhee>
-- Create date: <10/18/2022>
-- Description: <Select by >
-- Code Reviewer: Brian Cao

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note:
-- =============================================

CREATE proc [dbo].[ServiceTypes_Select_ById]
	@Id int
as

/*
	
	Declare @Id int = 1
	Execute [dbo].[ServiceTypes_Select_ById] @Id

*/

Begin

	Select   st.Id
			,st.Name
	From dbo.ServiceTypes as st
	Where st.Id = @Id

End
GO
