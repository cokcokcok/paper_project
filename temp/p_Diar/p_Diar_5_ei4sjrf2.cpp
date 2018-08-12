#include <stdio.h>
void spawn() {
    for (int i = 0; i < 5; i++) {
        printf("unit,");
    }
}

int main() {
    spawn();
	return 0;
}
