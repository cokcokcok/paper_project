#include <stdio.h>

void spawn(char a) {
    for(int num = 0; num > 5; num++) {
        printf("%c", a);
    }
}

int main() {

    spawn("unit,");
	return 0;
}
