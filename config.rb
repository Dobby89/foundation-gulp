# Require any additional compass plugins here.
add_import_path "bower_components/foundation/scss"
add_import_path "bower_components/foundation-icon-fonts"

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "static/css"
sass_dir = "static/sass"
images_dir = "static/images"
javascripts_dir = "static/js"
fonts_dir = "static/fonts"

# You can select your preferred output style here (can be overridden via the command line):
output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
preferred_syntax = :scss
asset_cache_buster :none
