#include <stdio.h>

void attack() {
    printf("attack,");
}
void spawn() {
    for(int i = 0; i < 5; i++) {
        printf("unit,");
    }
}
int main() {
    attack();
    spawn();
	return 0;
}
