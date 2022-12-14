USE [MiVet]
GO
/****** Object:  Table [dbo].[ServiceTypes]    Script Date: 10/31/2022 6:03:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceTypes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[UserId] [int] NULL,
	[IsDefaultValue] [bit] NULL,
 CONSTRAINT [PK_ServiceTypes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ServiceTypes]  WITH CHECK ADD  CONSTRAINT [FK_ServiceTypes_ServiceTypes] FOREIGN KEY([Id])
REFERENCES [dbo].[ServiceTypes] ([Id])
GO
ALTER TABLE [dbo].[ServiceTypes] CHECK CONSTRAINT [FK_ServiceTypes_ServiceTypes]
GO
