from django.views.generic import ListView, DetailView
from django.shortcuts import get_object_or_404
from main.models import Category, Product, SubCategory


class CategoryListView(ListView):
    extra_context = {
        'title': 'Параллакс'
    }
    model = Category
    template_name = 'main/home.html'
    context_object_name = 'categories'


class CategoryDetailView(DetailView):
    model = Category
    template_name = 'main/category_detail.html'
    context_object_name = 'category'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['subcategories'] = self.object.subcategories.all()
        return context
    

class ProductsBySubCategoryView(ListView):
    model = Product
    template_name = 'main/products_by_subcategory.html'
    context_object_name = 'products'

    def get_queryset(self):
        self.subcategory = get_object_or_404(SubCategory, slug=self.kwargs['slug'])
        
        return Product.objects.filter(subcategory=self.subcategory).order_by('id')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        subcategory = self.subcategory
        category = subcategory.category
        
        context['subcategory'] = self.subcategory
        context['category'] = category

        # логический флаг
        context['show_back_to_category'] = category.has_own_page

        return context
    

class ProductDetailView(DetailView):
    model = Product
    template_name = 'main/product_detail.html'
    context_object_name = 'product'
    slug_field = 'slug'
    slug_url_kwarg = 'slug'
