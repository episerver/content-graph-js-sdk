provider "azurerm" {
    features {}
    subscription_id = "${var.subscription_id}"
    client_id       = "${var.client_id}"
    client_secret   = "${var.client_secret}"
    tenant_id       = "${var.tenant_id}"
}

resource "azurerm_resource_group" "musicfestival" {
  name     = "musicfestival-resource-group"
  location = "eastus"
}

resource "azurerm_container_registry" "musicfestival" {
  name                = "musicfestivalacr"
  resource_group_name = azurerm_resource_group.musicfestival.name
  location            = azurerm_resource_group.musicfestival.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_storage_account" "musicfestival" {
  name                     = "musicfestivalsa"
  resource_group_name      = azurerm_resource_group.musicfestival.name
  location                 = azurerm_resource_group.musicfestival.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_mssql_server" "musicfestival" {
  name                         = "musicfestivalsqlserver"
  resource_group_name          = azurerm_resource_group.musicfestival.name
  location                     = azurerm_resource_group.musicfestival.location
  version                      = "12.0"
  administrator_login          = "sqladmin"
  administrator_login_password = "${var.sql_password}"
}

resource "azurerm_mssql_firewall_rule" "internal" {
  name             = "internal"
  server_id        = azurerm_mssql_server.musicfestival.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

resource "azurerm_mssql_database" "musicfestival" {
  name                = "musicfestivaldb"
  server_id           = azurerm_mssql_server.musicfestival.id
  license_type        = "LicenseIncluded"
}

resource "azurerm_service_plan" "musicfestival" {
  name                = "backendappserviceplan"
  location            = azurerm_resource_group.musicfestival.location
  resource_group_name = azurerm_resource_group.musicfestival.name
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_linux_web_app" "musicfestival" {
  name                = "musicfestival-app"
  location            = azurerm_resource_group.musicfestival.location
  resource_group_name = azurerm_resource_group.musicfestival.name
  service_plan_id     = azurerm_service_plan.musicfestival.id

  site_config {
      application_stack {
          docker_image     = "${azurerm_container_registry.musicfestival.login_server}/musicfestivalimage"
          docker_image_tag = "latest"
      }
    always_on        = true
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "DOCKER_REGISTRY_SERVER_URL"         = "https://${azurerm_container_registry.musicfestival.login_server}"
    "DOCKER_REGISTRY_SERVER_USERNAME"    = azurerm_container_registry.musicfestival.admin_username
    "DOCKER_REGISTRY_SERVER_PASSWORD"    = azurerm_container_registry.musicfestival.admin_password
    "ConnectionStrings__EPiServerDB"     = "Server=tcp:${azurerm_mssql_server.musicfestival.name}.database.windows.net,1433;Initial Catalog=${azurerm_mssql_database.musicfestival.name};Persist Security Info=False;User ID=${azurerm_mssql_server.musicfestival.administrator_login};Password=${azurerm_mssql_server.musicfestival.administrator_login_password};MultipleActiveResultSets=True;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
    "Optimizely__ContentGraph__AllowSendingLog"       = true
    "Optimizely__ContentGraph__AllowSyncDraftContent" = true
    "Optimizely__ContentGraph__Experimental"          = true
    "Optimizely__ContentGraph__GatewayAddress"        = "${var.gateway}"
    "Optimizely__ContentGraph__AppKey"                = "${var.app_key}"
    "Optimizely__ContentGraph__Secret"                = "${var.secret}"
    "Optimizely__ContentGraph__SingleKey"             = "${var.single_key}"
  }
}

output "app_service_url" {
  value = "https://${azurerm_linux_web_app.musicfestival.default_hostname}"
}
