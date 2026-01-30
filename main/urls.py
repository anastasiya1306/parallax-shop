from django.urls import path
from .views import CategoryListView, CategoryDetailView, ProductsBySubCategoryView, ProductDetailView
from .apps import MainConfig

app_name = MainConfig.name

urlpatterns = [
    path('', CategoryListView.as_view(), name='home'),
    path('category/<slug:slug>/', CategoryDetailView.as_view(), name='category_detail'),
    path('subcategory/<slug:slug>/', ProductsBySubCategoryView.as_view(), name='products_by_subcategory'),
    path('product/<slug:slug>/', ProductDetailView.as_view(), name='product_detail'),
]