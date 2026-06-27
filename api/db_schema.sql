-- CIN Database Schema
-- Run this to create all tables

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- Users
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    persona VARCHAR(50) DEFAULT 'civil_aspirant',
    organization VARCHAR(255),
    designation VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge Base
CREATE TABLE IF NOT EXISTS knowledge_base_registry (
    registry_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_title VARCHAR(500) NOT NULL,
    statutory_act VARCHAR(200) NOT NULL,
    section_clause VARCHAR(200) NOT NULL,
    year_of_origin INTEGER NOT NULL,
    jurisdiction_scope VARCHAR(50) DEFAULT 'India',
    document_type VARCHAR(50) DEFAULT 'Statute'
);

-- ESG Vendors
CREATE TABLE IF NOT EXISTS esg_value_chain_vendors (
    vendor_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_company_id VARCHAR(100) NOT NULL,
    vendor_name VARCHAR(255) NOT NULL,
    sector VARCHAR(100),
    compliance_status VARCHAR(50) DEFAULT 'Pending Intake'
);

-- Carbon Ledger
CREATE TABLE IF NOT EXISTS icm_carbon_ledgers (
    ledger_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id VARCHAR(100) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    target_year INTEGER NOT NULL,
    actual_emissions_tco2e NUMERIC(12,2),
    compliance_status VARCHAR(20)
);

-- Geospatial Plots
CREATE TABLE IF NOT EXISTS geospatial_afforestation_plots (
    plot_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id VARCHAR(100) NOT NULL,
    plot_name VARCHAR(255) NOT NULL,
    state_location VARCHAR(100) NOT NULL,
    current_ndvi NUMERIC(4,3)
);

-- Social Framework
CREATE TABLE IF NOT EXISTS social_framework_ledgers (
    ledger_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id VARCHAR(100) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    fpic_workflow_status VARCHAR(50) DEFAULT 'Initiated'
);

-- Materiality
CREATE TABLE IF NOT EXISTS materiality_entries (
    entry_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id VARCHAR(100) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    risk_category VARCHAR(100) NOT NULL,
    financial_materiality_score INTEGER DEFAULT 1
);

-- Clearance Projects
CREATE TABLE IF NOT EXISTS corporate_clearance_projects (
    project_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_identifier VARCHAR(100) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    target_state VARCHAR(100) NOT NULL,
    total_investment_cr NUMERIC(12,2) NOT NULL
);
