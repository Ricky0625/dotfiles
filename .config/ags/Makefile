SRC			:= $(shell find . -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" -o -name "*.scss" -o -name "*.css")
INSTANCE	:= astal

run:
	@echo "$(SRC)" | sed "s/ /\n/g" | entr -r -s "echo -e '\nStarted new instance of $(INSTANCE)!\n' && ags run app.ts --gtk4"

