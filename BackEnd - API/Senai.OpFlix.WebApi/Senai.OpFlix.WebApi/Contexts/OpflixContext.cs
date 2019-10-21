using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Senai.OpFlix.WebApi.Domains
{
    public partial class OpflixContext : DbContext
    {
        public OpflixContext()
        {
        }

        public OpflixContext(DbContextOptions<OpflixContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Categorias> Categorias { get; set; }
        public virtual DbSet<Favoritos> Favoritos { get; set; }
        public virtual DbSet<Lancamentos> Lancamentos { get; set; }
        public virtual DbSet<Perfil> Perfil { get; set; }
        public virtual DbSet<Plataformas> Plataformas { get; set; }
        public virtual DbSet<TipoConteudo> TipoConteudo { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        // Unable to generate entity type for table 'dbo.PlataformaLancamento'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=.\\SqlExpress; Initial Catalog=T_OpFlix;User Id=sa;Pwd=132");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categorias>(entity =>
            {
                entity.HasKey(e => e.IdCategoria);

                entity.HasIndex(e => e.Nome)
                    .HasName("UQ__Categori__7D8FE3B2DA7EA014")
                    .IsUnique();

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Favoritos>(entity =>
            {
                entity.HasKey(e => e.IdPadrao);

                entity.HasOne(d => d.IdLancamentoNavigation)
                    .WithMany(p => p.Favoritos)
                    .HasForeignKey(d => d.IdLancamento)
                    .HasConstraintName("FK__Favoritos__IdLan__4E53A1AA");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Favoritos)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK__Favoritos__IdUsu__4F47C5E3");
            });

            modelBuilder.Entity<Lancamentos>(entity =>
            {
                entity.HasKey(e => e.IdLancamento);

                entity.Property(e => e.DataLancamento).HasColumnType("date");

                entity.Property(e => e.FotoLanc)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuiT4aUF2rJrPxA9lcBEHDTR1aLsP8TjDLCIt8PvsNjlx1JSK')");

                entity.Property(e => e.Sinopse)
                    .IsRequired()
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.Titulo)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdCategoriaNavigation)
                    .WithMany(p => p.Lancamentos)
                    .HasForeignKey(d => d.IdCategoria)
                    .HasConstraintName("FK__Lancament__IdCat__151B244E");

                entity.HasOne(d => d.IdTipoConteudoNavigation)
                    .WithMany(p => p.Lancamentos)
                    .HasForeignKey(d => d.IdTipoConteudo)
                    .HasConstraintName("FK__Lancament__IdTip__160F4887");
            });

            modelBuilder.Entity<Perfil>(entity =>
            {
                entity.HasKey(e => e.IdPerfil);

                entity.HasIndex(e => e.TipoPerfil)
                    .HasName("UQ__Perfil__853D01F7D3818AD5")
                    .IsUnique();

                entity.Property(e => e.TipoPerfil)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Plataformas>(entity =>
            {
                entity.HasKey(e => e.IdPlataforma);

                entity.HasIndex(e => e.Nome)
                    .HasName("UQ__Platafor__7D8FE3B21F0FEAF9")
                    .IsUnique();

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoConteudo>(entity =>
            {
                entity.HasKey(e => e.IdTipoConteudo);

                entity.HasIndex(e => e.Nome)
                    .HasName("UQ__TipoCont__7D8FE3B256648DAA")
                    .IsUnique();

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Usuarios__A9D105343110465E")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.FotoPerfil)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdPerfilNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdPerfil)
                    .HasConstraintName("FK__Usuarios__IdPerf__4D94879B");
            });
        }
    }
}
