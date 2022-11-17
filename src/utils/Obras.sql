USE [master]
GO
/****** Object:  Database [PagosObra2022]    Script Date: 19/10/2022 10:43:27 ******/
CREATE DATABASE [PagosObra2022]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PagosObra2022', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS2017\MSSQL\DATA\PagosObra2022.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'PagosObra2022_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS2017\MSSQL\DATA\PagosObra2022_log.ldf' , SIZE = 2304KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [PagosObra2022] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PagosObra2022].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PagosObra2022] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PagosObra2022] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PagosObra2022] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PagosObra2022] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PagosObra2022] SET ARITHABORT OFF 
GO
ALTER DATABASE [PagosObra2022] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PagosObra2022] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PagosObra2022] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PagosObra2022] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PagosObra2022] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PagosObra2022] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PagosObra2022] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PagosObra2022] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PagosObra2022] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PagosObra2022] SET  DISABLE_BROKER 
GO
ALTER DATABASE [PagosObra2022] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PagosObra2022] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PagosObra2022] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PagosObra2022] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PagosObra2022] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PagosObra2022] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PagosObra2022] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PagosObra2022] SET RECOVERY FULL 
GO
ALTER DATABASE [PagosObra2022] SET  MULTI_USER 
GO
ALTER DATABASE [PagosObra2022] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PagosObra2022] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PagosObra2022] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PagosObra2022] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [PagosObra2022] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PagosObra2022] SET QUERY_STORE = OFF
GO
USE [PagosObra2022]
GO
/****** Object:  User [extrano1]    Script Date: 19/10/2022 10:43:27 ******/
CREATE USER [extrano1] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[db_datareader]
GO
/****** Object:  Table [dbo].[Detalle_Nota]    Script Date: 19/10/2022 10:43:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Detalle_Nota](
	[id_Detalle] [int] IDENTITY(1,1) NOT NULL,
	[Obra] [int] NULL,
	[Prove] [int] NULL,
	[Material] [int] NULL,
	[Nota] [int] NULL,
	[Cantidad] [int] NULL,
	[PrecioUnitario] [float] NULL,
	[Extra] [varchar](50) NULL,
 CONSTRAINT [PK_Detalle_Nota] PRIMARY KEY CLUSTERED 
(
	[id_Detalle] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Material]    Script Date: 19/10/2022 10:43:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Material](
	[Id_Mate] [int] IDENTITY(1,1) NOT NULL,
	[Nombre_Mat] [varchar](80) NULL,
	[Marca] [varchar](80) NULL,
	[Categoria] [varchar](50) NULL,
	[UnidadMedida] [varchar](50) NULL,
 CONSTRAINT [PK_Material] PRIMARY KEY CLUSTERED 
(
	[Id_Mate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Nota]    Script Date: 19/10/2022 10:43:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Nota](
	[id_Nota] [int] IDENTITY(1,1) NOT NULL,
	[Fecha] [date] NULL,
	[Extra] [varchar](120) NULL,
 CONSTRAINT [PK_Nota] PRIMARY KEY CLUSTERED 
(
	[id_Nota] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Obra]    Script Date: 19/10/2022 10:43:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Obra](
	[id_Obra] [int] IDENTITY(1,1) NOT NULL,
	[Nombre_Obra] [varchar](120) NULL,
	[Direccion] [varchar](150) NULL,
	[Fecha_ini] [date] NULL,
	[fecha_fin] [date] NULL,
	[Dueño] [varchar](120) NULL,
	[Responsable] [varchar](120) NULL,
	[Tel_resp] [varchar](20) NULL,
	[Correo_res] [varchar](150) NULL,
 CONSTRAINT [PK_Obra] PRIMARY KEY CLUSTERED 
(
	[id_Obra] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Proveedor]    Script Date: 19/10/2022 10:43:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Proveedor](
	[Id_Prove] [int] IDENTITY(1,1) NOT NULL,
	[RazonSoc] [varchar](150) NULL,
	[Agente] [varchar](120) NULL,
	[Direccion] [varchar](120) NULL,
	[Telefono] [varchar](20) NULL,
	[Correo] [varchar](150) NULL,
	[Tipo_Material] [varchar](90) NULL,
 CONSTRAINT [PK_Proveedor] PRIMARY KEY CLUSTERED 
(
	[Id_Prove] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Detalle_Nota] ON 

INSERT [dbo].[Detalle_Nota] ([id_Detalle], [Obra], [Prove], [Material], [Nota], [Cantidad], [PrecioUnitario], [Extra]) VALUES (1, 1, 1, 8, 1, 12, 320, NULL)
INSERT [dbo].[Detalle_Nota] ([id_Detalle], [Obra], [Prove], [Material], [Nota], [Cantidad], [PrecioUnitario], [Extra]) VALUES (2, 1, 1, 1, 1, 20, 250, NULL)
INSERT [dbo].[Detalle_Nota] ([id_Detalle], [Obra], [Prove], [Material], [Nota], [Cantidad], [PrecioUnitario], [Extra]) VALUES (3, 1, 1, 4, 1, 40, 120, NULL)
SET IDENTITY_INSERT [dbo].[Detalle_Nota] OFF
GO
SET IDENTITY_INSERT [dbo].[Material] ON 

INSERT [dbo].[Material] ([Id_Mate], [Nombre_Mat], [Marca], [Categoria], [UnidadMedida]) VALUES (1, N'Cemento Gris', N'Apasco', N'Polvos', N'Bulto de 25 kg')
INSERT [dbo].[Material] ([Id_Mate], [Nombre_Mat], [Marca], [Categoria], [UnidadMedida]) VALUES (2, N'Pega Azulejo', N'Crest', N'Polvos', N'Bulto de 15 kg')
INSERT [dbo].[Material] ([Id_Mate], [Nombre_Mat], [Marca], [Categoria], [UnidadMedida]) VALUES (3, N'Armex', N'Hylsa', N'Acero', N'Pieza de 6mts')
INSERT [dbo].[Material] ([Id_Mate], [Nombre_Mat], [Marca], [Categoria], [UnidadMedida]) VALUES (4, N'Cal', N'Calídra', N'Polvos', N'Bulto de 25 kg')
INSERT [dbo].[Material] ([Id_Mate], [Nombre_Mat], [Marca], [Categoria], [UnidadMedida]) VALUES (8, N'Varilla de 3/8"', N'Hylsa', N'Aceros', N'1 pieza 12m')
INSERT [dbo].[Material] ([Id_Mate], [Nombre_Mat], [Marca], [Categoria], [UnidadMedida]) VALUES (9, N'Alambre recocid', N'--', N'Aceros', N'Kg')
SET IDENTITY_INSERT [dbo].[Material] OFF
GO
SET IDENTITY_INSERT [dbo].[Nota] ON 

INSERT [dbo].[Nota] ([id_Nota], [Fecha], [Extra]) VALUES (1, CAST(N'2022-10-17' AS Date), N'Surtir y cobrar en la obra')
SET IDENTITY_INSERT [dbo].[Nota] OFF
GO
SET IDENTITY_INSERT [dbo].[Obra] ON 

INSERT [dbo].[Obra] ([id_Obra], [Nombre_Obra], [Direccion], [Fecha_ini], [fecha_fin], [Dueño], [Responsable], [Tel_resp], [Correo_res]) VALUES (1, N'Residencia Sergio', N'Fracc Heroes', CAST(N'2022-05-14' AS Date), CAST(N'2023-06-02' AS Date), N'Sergio Flores', N'Arq MAnuel', N'765757657', N'manuel@gmail.com')
SET IDENTITY_INSERT [dbo].[Obra] OFF
GO
SET IDENTITY_INSERT [dbo].[Proveedor] ON 

INSERT [dbo].[Proveedor] ([Id_Prove], [RazonSoc], [Agente], [Direccion], [Telefono], [Correo], [Tipo_Material]) VALUES (1, N'Construrama', N'Juan', N'14 sur 11125', N'5876887', N'constru2@gmail.com', NULL)
SET IDENTITY_INSERT [dbo].[Proveedor] OFF
GO
ALTER TABLE [dbo].[Detalle_Nota]  WITH CHECK ADD  CONSTRAINT [FK_Detalle_Nota_Material] FOREIGN KEY([Material])
REFERENCES [dbo].[Material] ([Id_Mate])
GO
ALTER TABLE [dbo].[Detalle_Nota] CHECK CONSTRAINT [FK_Detalle_Nota_Material]
GO
ALTER TABLE [dbo].[Detalle_Nota]  WITH CHECK ADD  CONSTRAINT [FK_Detalle_Nota_Nota] FOREIGN KEY([Nota])
REFERENCES [dbo].[Nota] ([id_Nota])
GO
ALTER TABLE [dbo].[Detalle_Nota] CHECK CONSTRAINT [FK_Detalle_Nota_Nota]
GO
ALTER TABLE [dbo].[Detalle_Nota]  WITH CHECK ADD  CONSTRAINT [FK_Detalle_Nota_Obra] FOREIGN KEY([Obra])
REFERENCES [dbo].[Obra] ([id_Obra])
GO
ALTER TABLE [dbo].[Detalle_Nota] CHECK CONSTRAINT [FK_Detalle_Nota_Obra]
GO
ALTER TABLE [dbo].[Detalle_Nota]  WITH CHECK ADD  CONSTRAINT [FK_Detalle_Nota_Proveedor] FOREIGN KEY([Prove])
REFERENCES [dbo].[Proveedor] ([Id_Prove])
GO
ALTER TABLE [dbo].[Detalle_Nota] CHECK CONSTRAINT [FK_Detalle_Nota_Proveedor]
GO
USE [master]
GO
ALTER DATABASE [PagosObra2022] SET  READ_WRITE 
GO