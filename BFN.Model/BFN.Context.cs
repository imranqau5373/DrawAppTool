﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BFN.Model
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class BFNEntities : DbContext
    {
        public BFNEntities()
            : base("name=BFNEntities")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<C__MigrationHistory> C__MigrationHistory { get; set; }
        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual DbSet<ShopContactPerson> ShopContactPersons { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<ShopTimeTemplateHour> ShopTimeTemplateHours { get; set; }
        public virtual DbSet<ShopTimeTemplateHistory> ShopTimeTemplateHistories { get; set; }
        public virtual DbSet<CompanyUser> CompanyUsers { get; set; }
        public virtual DbSet<ShopUser> ShopUsers { get; set; }
        public virtual DbSet<CompanyHistory> CompanyHistories { get; set; }
        public virtual DbSet<ShopContactPersonHistory> ShopContactPersonHistories { get; set; }
        public virtual DbSet<ShopTimeTemplateHoursHistory> ShopTimeTemplateHoursHistories { get; set; }
        public virtual DbSet<UserExpertise> UserExpertises { get; set; }
        public virtual DbSet<AspNetRole> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<ShopTimeTemplate> ShopTimeTemplates { get; set; }
        public virtual DbSet<ContactPerson> ContactPersons { get; set; }
        public virtual DbSet<ContactPersonHistory> ContactPersonHistories { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<CityPostCode> CityPostCodes { get; set; }
        public virtual DbSet<DeliveryOption> DeliveryOptions { get; set; }
        public virtual DbSet<ShopHistory> ShopHistories { get; set; }
        public virtual DbSet<ShopCompanyHandOverHistory> ShopCompanyHandOverHistories { get; set; }
        public virtual DbSet<Shop> Shops { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<ShopCompanyHandOver> ShopCompanyHandOvers { get; set; }
    }
}
