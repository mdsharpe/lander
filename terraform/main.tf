# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.2"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-mdsharpe-prod-westeurope-001"
  location = "westeurope"
}

resource "azurerm_static_site" "swa" {
  name                = "stapp-lander-prod-westeurope-001"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  depends_on = [
    azurerm_resource_group.rg
  ]
}

resource "azurerm_static_site_custom_domain" "domain" {
  domain_name    = "lander.mdsharpe.com"
  static_site_id = azurerm_static_site.swa.id
  validation_type = "cname-delegation"
  depends_on = [
    azurerm_static_site.swa,
  ]
}
