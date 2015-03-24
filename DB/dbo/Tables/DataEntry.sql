CREATE TABLE [dbo].[DataEntry] (
    [Name]     NVARCHAR (64)     NOT NULL,
    [Date]     DateTime          NULL,
    [Address]  NVARCHAR (64)     NOT NULL,
    [Location] [sys].[geography] NULL,
    CONSTRAINT [PK_DataEntry] PRIMARY KEY CLUSTERED ([Name] ASC)
);

