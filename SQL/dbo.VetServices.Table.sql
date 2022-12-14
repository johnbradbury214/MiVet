USE [MiVet]
GO
/****** Object:  Table [dbo].[VetServices]    Script Date: 9/27/2022 4:32:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VetServices](
	[VetProfileId] [int] NOT NULL,
	[ServiceId] [int] NOT NULL,
 CONSTRAINT [PK_VetServices] PRIMARY KEY CLUSTERED 
(
	[VetProfileId] ASC,
	[ServiceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[VetServices]  WITH CHECK ADD  CONSTRAINT [FK_VetServices_Services] FOREIGN KEY([ServiceId])
REFERENCES [dbo].[Services] ([Id])
GO
ALTER TABLE [dbo].[VetServices] CHECK CONSTRAINT [FK_VetServices_Services]
GO
ALTER TABLE [dbo].[VetServices]  WITH CHECK ADD  CONSTRAINT [FK_VetServices_VetProfiles] FOREIGN KEY([VetProfileId])
REFERENCES [dbo].[VetProfiles] ([Id])
GO
ALTER TABLE [dbo].[VetServices] CHECK CONSTRAINT [FK_VetServices_VetProfiles]
GO
